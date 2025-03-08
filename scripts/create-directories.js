/**
 * Script para criar diretórios necessários para o backend
 * Útil para garantir que todos os diretórios esperados existam
 */

const fs = require('fs');
const path = require('path');

// Diretórios a serem verificados/criados
const directories = [
  'logs',
  'uploads',
  'uploads/temp',
  'uploads/images',
  'uploads/documents',
  'src/config',
  'src/controllers',
  'src/models',
  'src/routes',
  'src/middleware',
  'src/utils',
  'src/seeds',
  'src/__tests__',
  'scripts'
];

// Função para criar diretório se não existir
const createDirectoryIfNotExists = (dirPath) => {
  // Obter caminho absoluto
  const absolutePath = path.resolve(__dirname, '..', dirPath);
  
  // Verificar se diretório existe
  if (!fs.existsSync(absolutePath)) {
    try {
      // Criar diretório recursivamente
      fs.mkdirSync(absolutePath, { recursive: true });
      console.log(`✅ Diretório criado: ${dirPath}`);
    } catch (error) {
      console.error(`❌ Erro ao criar diretório ${dirPath}:`, error.message);
    }
  } else {
    console.log(`✓ Diretório já existe: ${dirPath}`);
  }
};

// Criar todos os diretórios
console.log('Verificando e criando diretórios necessários...');
directories.forEach(createDirectoryIfNotExists);
console.log('Processo concluído!');

// Adicionar npm scripts se não existirem já
try {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = require(packageJsonPath);
  
  // Verificar se é necessário adicionar scripts
  let modified = false;
  
  // Adicionar script para criar diretórios
  if (!packageJson.scripts.directories) {
    packageJson.scripts.directories = 'node scripts/create-directories.js';
    modified = true;
  }
  
  // Adicionar script para seed
  if (!packageJson.scripts.seed) {
    packageJson.scripts.seed = 'node scripts/seed-database.js';
    modified = true;
  }
  
  // Adicionar script para iniciar com preparação
  if (!packageJson.scripts.prepare) {
    packageJson.scripts.prepare = 'npm run directories';
    modified = true;
  }
  
  // Salvar alterações
  if (modified) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Scripts adicionados ao package.json');
  }
} catch (error) {
  console.error('❌ Erro ao modificar package.json:', error.message);
} 