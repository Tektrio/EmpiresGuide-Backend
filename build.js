#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Verificar ambiente Render
const isRenderEnvironment = process.env.RENDER !== undefined;
console.log(`🚀 Ambiente de execução: ${isRenderEnvironment ? 'Render.com' : 'Local'}`);

// Função para executar comandos com logs
function runCommand(command) {
  console.log(`Executando: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Erro ao executar o comando: ${error.message}`);
    return false;
  }
}

// Função para garantir que um diretório existe
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Criando diretório: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }
  return false;
}

// Configurar variáveis de ambiente
if (isRenderEnvironment) {
  console.log("Configurando variáveis de ambiente...");
  try {
    if (fs.existsSync('./.env.render')) {
      fs.copyFileSync('./.env.render', './.env');
      console.log("✅ Arquivo .env.render copiado para .env");
    } 
  } catch (error) {
    console.error(`❌ Erro ao copiar .env.render: ${error.message}`);
  }
}

// Garantir que o diretório dist existe
console.log("📁 Criando diretório dist...");
ensureDirectoryExists('./dist');

// Função recursiva para copiar diretório
function copyDir(src, dest) {
  ensureDirectoryExists(dest);
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Ignorar diretório types
      if (entry.name === 'types' && src.endsWith('src')) {
        continue;
      }
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith('.ts')) {
      // Converter .ts para .js e copiar
      const destJsPath = destPath.replace('.ts', '.js');
      const content = fs.readFileSync(srcPath, 'utf8');
      // Remover imports de tipagem e corrigir imports
      const processedContent = content
        .replace(/import\s+[^;]+\s+from\s+['"]@types\/[^'"]+['"]/g, '')
        .replace(/import\s+type\s+[^;]+\s+from\s+[^;]+;/g, '')
        // Lidar com imports desestruturados
        .replace(/import\s+{\s*connectDB\s*}/, 'import connectDB')
        // Converter import { X } from Y para import X from Y para compatibilidade com CommonJS
        .replace(/import\s+{\s*([^{}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g, (match, importName, path) => {
          // Se for um import múltiplo, manter desestruturado
          if (importName.includes(',')) return match;
          return `import ${importName} from '${path}'`;
        });
        
      fs.writeFileSync(destJsPath, processedContent);
    } else {
      // Copiar outros arquivos sem alteração
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Sempre usar a cópia direta agora
console.log("⚙️ Realizando conversão direta TS -> JS via cópia...");
copyDir('./src', './dist');
console.log("✅ Cópia direta de arquivos concluída");

// Verificar se o build foi bem-sucedido
if (!fs.existsSync('./dist/index.js')) {
  console.error("❌ Falha crítica: Não foi possível gerar dist/index.js");
  process.exit(1);
}

console.log("✅ Build finalizado com sucesso!");

// Se estiver no ambiente Render, exibir informações adicionais
if (isRenderEnvironment) {
  console.log("\n=== Informações de Instalação ===");
  runCommand('ls -la ./dist');
  console.log("====================\n");
}

// Criar arquivo de verificação para confirmar build completo
fs.writeFileSync('./dist/build-info.json', JSON.stringify({
  buildDate: new Date().toISOString(),
  environment: isRenderEnvironment ? 'render' : 'local',
  success: true
}));
