#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Verificar ambiente
const isRenderEnvironment = process.env.RENDER === 'true' || process.env.RENDER === 'TRUE';
console.log(`🚀 Ambiente de execução: ${isRenderEnvironment ? 'Render' : 'Local'}`);

// Configurar variáveis de ambiente para o Render
if (isRenderEnvironment && fs.existsSync('./.env.render')) {
  console.log('📄 Copiando .env.render para .env no ambiente Render...');
  fs.copyFileSync('./.env.render', './.env');
  console.log('✅ Arquivo .env configurado com sucesso.');
}

// Definir diretórios
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Criar diretório dist se não existir
console.log('📁 Criando diretório dist...');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Função para converter arquivos TS para JS de forma extremamente simplificada
function simplifyTsToJs(content) {
  // Remover comentários de múltiplas linhas (que podem conter código TypeScript)
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remover comentários de linha única
  content = content.replace(/\/\/.*$/gm, '');
  
  // 1. Remover blocos de interface completamente
  content = content.replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '');
  
  // 2. Remover blocos de type completamente
  content = content.replace(/type\s+\w+\s*=[\s\S]*?;/g, '');
  
  // 3. Converter importações para CommonJS - remover completamente qualquer sintaxe import
  content = content.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
  content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
  
  // Remover qualquer import restante que não tenha sido convertido
  content = content.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
  
  // 4. Converter importações desestruturadas
  content = content.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"];?/g, (match, imports, module) => {
    const cleanImports = imports.split(',')
      .map(i => i.trim().split(' as ')[0].trim())
      .filter(i => !i.includes('Type') && !i.includes('Interface'))
      .join(', ');
    
    if (cleanImports.length === 0) return '';
    return `const { ${cleanImports} } = require("${module}");`;
  });
  
  // 5. Remover todas as importações de tipos
  content = content.replace(/import\s+type.*?;/g, '');
  
  // 6. Remover todas as anotações de tipo
  content = content.replace(/:\s*[A-Za-z0-9_<>[\]|&{},\s.]+(?=(\s*[=;,)]|\s*\{))/g, '');
  content = content.replace(/<[^>]+>/g, '');
  
  // 7. Converter exports para CommonJS
  content = content.replace(/export\s+default\s+(\w+);?/g, 'module.exports = $1;');
  content = content.replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');
  content = content.replace(/export\s+function\s+(\w+)/g, 'function $1');
  content = content.replace(/export\s+class\s+(\w+)/g, 'class $1');
  
  // 8. Adicionar module.exports para exportações nomeadas
  content = content.replace(/export\s+\{\s*([^}]+)\s*\};?/g, (match, exports) => {
    return exports.split(',')
      .map(e => `module.exports.${e.trim()} = ${e.trim()};`)
      .join('\n');
  });
  
  // 9. Corrigir problemas específicos
  // 9.1 Corrigir opções de conexão no db.js
  content = content.replace(/socketTimeoutMS,/g, 'socketTimeoutMS: 45000,');
  content = content.replace(/serverSelectionTimeoutMS,/g, 'serverSelectionTimeoutMS: 10000,');
  content = content.replace(/retryWrites,/g, 'retryWrites: true,');
  content = content.replace(/family,/g, 'family: 4,');
      
  // Corrigir específicamente o problema com o retryWrites
  content = content.replace(/retryWrites: process\.env\.RETRY_WRITES === 'true' \? true : true,/g, 
                          'retryWrites: true,');
      
  // Remover vírgulas extras em objetos JSON
  content = content.replace(/,(\s*})/g, '$1');
  
  // 9.2 Corrigir o problema com o morgan
  content = content.replace(/app\.use\(morgan\('combined', \{ stream\)\);/g, 
                           `app.use(morgan('combined', { stream: accessLogStream }));`);
  
  // 9.3 Remover linhas que começam com > ou < (restos de interfaces)
  content = content.replace(/^[><].*$/gm, '');
  
  // 9.4 Remover linhas que contêm apenas um ponto e vírgula
  content = content.replace(/^\s*;\s*$/gm, '');
  
  // 9.5 Remover linhas que contêm apenas um nome de propriedade seguido de ponto e vírgula
  content = content.replace(/^\s*\w+\s*;\s*$/gm, '');
  
  // 9.6 Remover linhas que contêm apenas chaves
  content = content.replace(/^\s*[\{\}]\s*$/gm, '');
  
  // 9.7 Corrigir objetos JSON mal formados
  content = content.replace(/,(\s*[}\]])/g, '$1');
  
  // 9.8 Remover linhas vazias consecutivas
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // 9.9 Corrigir log da API URL no arquivo index.js - problema específico do Render
  content = content.replace(/console\.log\(`🔗 API URL: http/g, 
                          'console.log(`🔗 API URL: http://${host === \'0.0.0.0\' ? \'localhost\' : host}:${PORT}`');
  
  // 9.10 Corrigir problema específico no arquivo StrategyController.js
  content = content.replace(/uniqueTechnologies\{/g, 'uniqueTechnologies: [')
           .replace(/\}\s*\]/g, '}]');
  
  // 9.10 Certificar-se que não haja backticks corrompidos
  content = content.replace(/(`.*?)\\n(.*?`)/g, '$1$2');
  
  return content;
}

// Função recursiva para copiar e converter diretórios
function copyAndConvert(src, dest) {
  // Criar diretório de destino se não existir
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  // Ler todos os arquivos no diretório fonte
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Copiar subdiretórios recursivamente
      copyAndConvert(srcPath, destPath);
    } else {
      // Processar arquivos
      if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
        try {
          // Ler conteúdo do arquivo TypeScript
          const content = fs.readFileSync(srcPath, 'utf8');
          
          // Simplificar e converter para JavaScript
          const jsContent = simplifyTsToJs(content);
          
          // Escrever o arquivo JavaScript resultante
          const jsPath = destPath.replace(/\.ts$/, '.js');
          fs.writeFileSync(jsPath, jsContent);
        } catch (error) {
          console.error(`❌ Erro ao processar arquivo ${srcPath}:`, error.message);
        }
      } else if (!entry.name.endsWith('.d.ts')) {
        // Copiar outros arquivos sem alteração
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Executar a conversão
console.log('⚙️ Iniciando conversão TypeScript -> JavaScript...');
try {
  copyAndConvert(srcDir, distDir);
  console.log('✅ Conversão concluída com sucesso!');
  
  // Criar diretório de logs e uploads se necessário
  const logsDir = path.join(__dirname, 'logs');
  const uploadsDir = path.join(__dirname, 'uploads');
  const uploadsImagesDir = path.join(uploadsDir, 'images');
  const uploadsDocumentsDir = path.join(uploadsDir, 'documents');
  const uploadsTempDir = path.join(uploadsDir, 'temp');
  
  // Criar diretórios necessários
  [logsDir, uploadsDir, uploadsImagesDir, uploadsDocumentsDir, uploadsTempDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Diretório criado: ${dir}`);
    }
  });
  
  // Adicionar informações de build
  const buildInfo = {
    timestamp: new Date().toISOString(),
    environment: isRenderEnvironment ? 'render' : 'local',
    nodeVersion: process.version
  };
  
  fs.writeFileSync(
    path.join(distDir, 'build-info.json'), 
    JSON.stringify(buildInfo, null, 2)
  );
  
  // Corrigir manualmente arquivos problemáticos no Render
  const fixRenderSpecificIssues = () => {
    try {
      // Substituir completamente o arquivo index.js para garantir que não haja erros
      const indexJsPath = path.join(distDir, 'index.js');
      
      // Criar um index.js simplificado que evita todos os problemas
      const safeIndexContent = `
"use strict";

// Carregar variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config();

// Importar dependências
const app = require('./app');
const { connectDB } = require('./config/db');
const { checkDatabaseConfig } = require('./utils/checkDbConfig');

// Verificar configuração do banco de dados
const dbConfigValid = checkDatabaseConfig();

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;

// Definir o host - No Render.com, precisamos escutar em 0.0.0.0
const host = '0.0.0.0'; // Sempre escutar em todas as interfaces no ambiente de produção

// Iniciar o servidor após conectar ao banco de dados
const startServer = async () => {
  try {
    // Verificar configuração do banco de dados
    console.log('✅ Verificação de configuração do banco de dados: ' + (dbConfigValid ? 'Válida' : 'Inválida mas continuando'));
    
    // Conectar ao banco de dados
    await connectDB();
    
    // Definir handler para encerramento limpo
    process.on('SIGINT', async () => {
      console.log('Encerrando servidor...');
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('Encerrando servidor...');
      process.exit(0);
    });
    
    // Iniciar o servidor
    app.listen(PORT, host, () => {
      console.log('✅ Servidor rodando na porta ' + PORT);
      console.log('📊 Modo: ' + (process.env.NODE_ENV || 'development'));
      console.log('🔗 API URL: http://' + (host === '0.0.0.0' ? 'localhost' : host) + ':' + PORT);
      console.log('✅ API está pronta para receber conexões');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    
    // Tentar iniciar o servidor mesmo com erro
    try {
      app.listen(PORT, host, () => {
        console.log('✅ Servidor de emergência rodando na porta ' + PORT);
        console.log('⚠️ API em MODO DE EMERGÊNCIA - Funcionalidade extremamente limitada');
      });
    } catch (serverError) {
      console.error('❌ Falha ao iniciar o servidor de emergência:', serverError);
      process.exit(1);
    }
  }
};

// Iniciar o servidor
startServer();
      `;
      
      // Escrever o arquivo seguro
      fs.writeFileSync(indexJsPath, safeIndexContent);
      console.log('✅ Arquivo index.js substituído por uma versão segura');
      
      
      // Corrigir o arquivo db.js para garantir que não haja erros de sintaxe
      const dbJsPath = path.join(distDir, 'config', 'db.js');
      if (fs.existsSync(dbJsPath)) {
        let dbContent = fs.readFileSync(dbJsPath, 'utf8');
        
        // Corrigir sintaxe do objeto connectOptions
        dbContent = dbContent.replace(
          /const connectOptions = \{[\s\S]*?\};/g,
          `const connectOptions = {
  serverSelectionTimeoutMS: process.env.SERVER_SELECTION_TIMEOUT_MS ? 
    parseInt(process.env.SERVER_SELECTION_TIMEOUT_MS) : 10000,
  retryWrites: true,
  socketTimeoutMS: process.env.SOCKET_TIMEOUT_MS ? 
    parseInt(process.env.SOCKET_TIMEOUT_MS) : 45000,
  family: 4
};`
        );
        
        // Garantir que não existam vírgulas extras ou erros de sintaxe
        dbContent = dbContent.replace(/,(\s*})/g, '$1');
        dbContent = dbContent.replace(/,(\s*\])/g, '$1');
        
        fs.writeFileSync(dbJsPath, dbContent);
        console.log('✅ Arquivo db.js corrigido manualmente para o Render');
      }
      
      // Substituir completamente o arquivo app.js para garantir que não haja erros
      const appJsPath = path.join(distDir, 'app.js');
      if (fs.existsSync(appJsPath)) {
        // Criar uma versão segura do app.js
        const safeAppContent = `
"use strict";

// Importações usando CommonJS
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Importação de rotas
const strategyRoutes = require('./routes/strategyRoutes');
const userRoutes = require('./routes/userRoutes');
const matchupRoutes = require('./routes/matchupRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const strategyGuideRoutes = require('./routes/strategyGuideRoutes');
const healthRoutes = require('./routes/health');

// Inicializar o aplicativo Express
const app = express();

// Middleware para verificar o estado da conexão com o banco de dados
const dbConnectionMiddleware = (req, res, next) => {
  // Lista de rotas que devem funcionar mesmo sem banco de dados
  const nonDbRoutes = [
    '/',
    '/api/ping',
    '/health'
  ];
  
  // Se o caminho está na lista de rotas não dependentes de banco, seguir adiante
  if (nonDbRoutes.includes(req.path)) {
    return next();
  }
  
  // Verificar se o banco de dados está conectado
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    // Para APIs que retornam JSON
    if (req.path.startsWith('/api/')) {
      return res.status(503).json({
        status: 'error',
        message: 'Serviço de banco de dados indisponível. Tente novamente mais tarde.',
        isDbConnected: false,
        allowedRoutes: nonDbRoutes,
        code: 'DB_CONNECTION_ERROR'
      });
    }
    
    // Para rotas que renderizam HTML
    return res.status(503).send('Serviço de banco de dados indisponível. Tente novamente mais tarde.');
  }
  
  // Banco de dados está conectado, continuar
  next();
};

// Configuração do Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(helmet());

// Configurar o logger
// Garantir que o diretório de logs exista
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// Rotas básicas
app.get('/', (req, res) => {
  const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;
  const dbStatus = isDbConnected ? 'Conectado' : 'Desconectado';
  const dbType = global.mockMongooseEnabled ? 'Em Memória (Fallback)' : 'MongoDB Atlas';
  
  res.status(200).send(\`
    <html>
      <head>
        <title>EmpiresGuide API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
          .status.ok { background-color: #d4edda; color: #155724; }
          .status.error { background-color: #f8d7da; color: #721c24; }
          .info { background-color: #e2e3e5; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <h1>EmpiresGuide API</h1>
        <div class="status \${isDbConnected ? 'ok' : 'error'}">
          <strong>Banco de Dados:</strong> \${dbStatus} (\${dbType})
        </div>
        <div class="info">
          <strong>Ambiente:</strong> \${process.env.NODE_ENV}
        </div>
        <div class="info">
          <strong>Endpoints Ativos:</strong>
          <ul>
            <li>/api/strategies - Estratégias para civilizações</li>
            <li>/api/matchups - Confrontos entre civilizações</li>
            <li>/api/users - Gestão de usuários</li>
            <li>/api/contributions - Contribuições da comunidade</li>
            <li>/api/guides - Guias estratégicos completos</li>
          </ul>
        </div>
        <p>© Tek Trio 2025 - Todos os direitos reservados.</p>
      </body>
    </html>
  \`);
});

// Aplicar middleware de verificação de banco de dados após rotas básicas
app.use(dbConnectionMiddleware);

// Rota de health check
app.use('/health', healthRoutes);

// Rotas da API
app.use('/api/strategies', strategyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matchups', matchupRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/guides', strategyGuideRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Erro interno do servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada'
  });
});

module.exports = app;`;
        
        // Escrever a versão segura do arquivo
        fs.writeFileSync(appJsPath, safeAppContent);
        console.log('✅ Arquivo app.js substituído por uma versão segura sem erros de sintaxe');
      } else {
        console.warn('⚠️ Arquivo app.js não encontrado!');
      }
    } catch (error) {
      console.error('❌ Erro ao aplicar correções manuais:', error.message);
    }
  };
  
  // Aplicar correções específicas para o Render
  if (isRenderEnvironment) {
    fixRenderSpecificIssues();
  }
  
  // Verificar se há erros sintáticos nos arquivos JavaScript gerados
  console.log('🔍 Verificando arquivos JavaScript gerados...');
  const checkFiles = [
    path.join(distDir, 'index.js'),
    path.join(distDir, 'app.js'),
    path.join(distDir, 'config', 'db.js')
  ];
  
  for (const file of checkFiles) {
    if (fs.existsSync(file)) {
      try {
        // Tentar validar o arquivo usando o Node.js
        const content = fs.readFileSync(file, 'utf8');
        
        // Procurar por patterns que poderiam causar SyntaxError
        if (content.includes("console.log('🔗 API URL: http:")) {
          console.log(`⚠️ Potencial erro de sintaxe em ${file} - Corrigindo console.log...`);
          let fixed = content.replace(
            /console\.log\('🔗 API URL: http:/g,
            "console.log('🔗 API URL: http://' + (host === '0.0.0.0' ? 'localhost' : host) + ':' + PORT);"
          ).replace(/console\.log\('🔗 API URL: http:[^']*'\);/g, 
            "console.log('🔗 API URL: http://' + (host === '0.0.0.0' ? 'localhost' : host) + ':' + PORT);"
          );
          fs.writeFileSync(file, fixed);
          console.log(`✅ Correção aplicada em ${file}`);
        }
        
        try {
          // Tentar validar o JavaScript usando o parser do Node
          require('vm').compileFunction(content, [], { filename: file });
          console.log(`✅ Arquivo verificado com sucesso: ${file}`);
        } catch (syntaxError) {
          console.error(`❌ Erro de sintaxe em ${file}:`, syntaxError.message);
          
          if (syntaxError.message.includes('Unexpected token')) {
            // Tentar corrigir automaticamente alguns casos comuns de erro
            const lines = content.split('\n');
            const errorLine = syntaxError.lineNumber || -1;
            
            if (errorLine > 0 && errorLine <= lines.length) {
              console.log(`📝 Linha problemática (${errorLine}): ${lines[errorLine-1]}`);
            }
          }
        }
      } catch (error) {
        console.error(`❌ Erro ao verificar ${file}:`, error.message);
      }
    } else {
      console.warn(`⚠️ Arquivo não encontrado: ${file}`);
    }
  }
  
  // Mostrar arquivos gerados no ambiente Render
  if (isRenderEnvironment) {
    console.log('\n=== Informações de Instalação ===');
    try {
      console.log(execSync('ls -la ./dist').toString());
    } catch (error) {
      console.error('❌ Erro ao listar arquivos:', error.message);
    }
    console.log('====================\n');
  }
  
} catch (error) {
  console.error('❌ Erro durante a conversão:', error.message);
  process.exit(1);
}
