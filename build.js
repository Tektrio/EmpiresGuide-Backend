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
  
  // 3. Converter importações para CommonJS
  content = content.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
  content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
  
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
  // 9.1 Corrigir socketTimeoutMS
  content = content.replace(/socketTimeoutMS,/g, 'socketTimeoutMS: 45000,');
  content = content.replace(/serverSelectionTimeoutMS,/g, 'serverSelectionTimeoutMS: 10000,');
  content = content.replace(/retryWrites,/g, 'retryWrites: true,');
  
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
      // Corrigir index.js no ambiente Render
      const indexJsPath = path.join(distDir, 'index.js');
      if (fs.existsSync(indexJsPath)) {
        let indexContent = fs.readFileSync(indexJsPath, 'utf8');
        
        // Substituir template strings potencialmente problemáticas
        indexContent = indexContent.replace(/console\.log\(`🔗 API URL: http/g, 
          "console.log('🔗 API URL: http://' + (host === '0.0.0.0' ? 'localhost' : host) + ':' + PORT");
        
        // Corrigir outras strings do arquivo index.js
        indexContent = indexContent.replace(/(\s*)console\.log\(`([^`]+)`\);/g, 
          (match, space, content) => `${space}console.log('${content}');`);
        
        fs.writeFileSync(indexJsPath, indexContent);
        console.log('✅ Arquivo index.js corrigido manualmente para o Render');
      }
      
      // Corrigir app.js no ambiente Render
      const appJsPath = path.join(distDir, 'app.js');
      if (fs.existsSync(appJsPath)) {
        let appContent = fs.readFileSync(appJsPath, 'utf8');
        
        // Corrigir o middleware de conexão
        appContent = appContent.replace(
          /if \(nonDbRoutes\.includes\(req\.path\)\) \{\s*return next\(\);\s*\n\s*if/g,
          "if (nonDbRoutes.includes(req.path)) {\n    return next();\n  }\n\n  if"
        );
        
        // Corrigir parâmetro extended
        appContent = appContent.replace(
          /urlencoded\(\{ extended, limit: '10mb' \}\)/g, 
          "urlencoded({ extended: true, limit: '10mb' })"
        );
        
        // Corrigir criação de diretório recursiva
        appContent = appContent.replace(
          /fs\.mkdirSync\(logsDir, \{ recursive\s*\)\s*;/g,
          "fs.mkdirSync(logsDir, { recursive: true });"
        );
        
        // Corrigir o handler de erros
        appContent = appContent.replace(
          /stack=== 'development' \? err\.stack \)/g,
          "stack: process.env.NODE_ENV === 'development' ? err.stack : undefined\n  })"
        );
        
        fs.writeFileSync(appJsPath, appContent);
        console.log('✅ Arquivo app.js corrigido manualmente para o Render');
      }
    } catch (error) {
      console.error('❌ Erro ao aplicar correções manuais:', error.message);
    }
  };
  
  // Aplicar correções específicas para o Render
  if (isRenderEnvironment) {
    fixRenderSpecificIssues();
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
