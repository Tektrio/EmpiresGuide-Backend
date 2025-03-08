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
        // Converter todos os imports para formato CommonJS
        .replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g, 'const $1 = require("$2")')
        // Lidar com imports desestruturados
        .replace(/import\s+{\s*([^{}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g, (match, importNames, modulePath) => {
          // Processar cada importação individualmente para lidar com possíveis aliases
          const imports = importNames.split(',').map(name => {
            name = name.trim();
            if (name.includes(' as ')) {
              const [originalName, alias] = name.split(' as ').map(s => s.trim());
              return `const ${alias} = require("${modulePath}").${originalName}`;
            }
            return `const ${name} = require("${modulePath}").${name}`;
          }).join(';\n');
          return imports;
        })
        // Converter export default
        .replace(/export\s+default\s+(\w+)/g, 'module.exports = $1')
        // Converter export const, class, function, etc
        .replace(/export\s+(const|let|var|function|class)\s+(\w+)/g, '$1 $2; module.exports.$2 = $2')
        // Converter export { ... }
        .replace(/export\s+{([^}]+)}/g, (match, exportNames) => {
          const names = exportNames.split(',').map(name => name.trim());
          return `module.exports = Object.assign(module.exports || {}, { ${names.join(', ')} })`;
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
