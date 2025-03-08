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
  
  // Criar diretório de logs se necessário
  const logsDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }
  
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
