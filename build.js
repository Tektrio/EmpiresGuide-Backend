#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Verifica o ambiente
const isRenderEnvironment = process.env.RENDER === 'true' || process.env.RENDER === 'TRUE';
console.log(`🚀 Ambiente de execução: ${isRenderEnvironment ? 'Render' : 'Local'}`);

// Define os caminhos
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Cria o diretório dist se não existir
console.log('📁 Criando diretório dist...');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Função para processar o conteúdo de arquivos TypeScript
function processTypeScriptContent(content) {
  // Remover importações de tipos
  content = content.replace(/import\s+type\s+[^;]+\s*;/g, '');
  content = content.replace(/import\s+\{\s*([^}]*?Type[^}]*?)\s*\}\s+from\s+['"][^'"]+['"];?/g, '');
  content = content.replace(/import\s+[^;]+\s+from\s+['"]@types\/[^'"]+['"]/g, '');

  // Processar primeiro as importações desestruturadas com nomes e tipos específicos
  // import express, { Request, Response, NextFunction } from 'express';
  content = content.replace(/import\s+(\w+),\s*\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g, (match, defaultImport, namedImports, module) => {
    // Remover anotações de tipo nas importações desestruturadas
    const cleanImports = namedImports.split(',')
      .map(item => item.trim().split(':')[0].trim())
      .join(', ');
    
    return `const ${defaultImport} = require("${module}");\nconst { ${cleanImports} } = require("${module}");`;
  });

  // Converter importações ESM em requires do CommonJS
  // 1. Import padrão: import x from 'y'; -> const x = require('y');
  content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g, 'const $1 = require("$2")');

  // 2. Import desestruturado: import { x, y } from 'z'; -> const { x, y } = require('z');
  content = content.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g, (match, imports, module) => {
    // Remover anotações de tipo nas importações desestruturadas
    const cleanImports = imports.split(',')
      .map(item => {
        // Remove anotações de tipo ou aliases complexos
        return item.trim().split(':')[0].trim();
      })
      .join(', ');
    
    return `const { ${cleanImports} } = require("${module}")`;
  });

  // 3. Import com namespace: import * as x from 'y'; -> const x = require('y');
  content = content.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g, 'const $1 = require("$2")');

  // Converter export padrão para module.exports
  content = content.replace(/export\s+default\s+(\w+)/g, 'module.exports = $1');

  // Converter export constante/let/var/function para module.exports.x = x
  const namedExportRegex = /export\s+(const|let|var|function|class)\s+(\w+)/g;
  let namedExportMatch;
  const exportedNames = [];
  
  while ((namedExportMatch = namedExportRegex.exec(content)) !== null) {
    const exportedName = namedExportMatch[2];
    exportedNames.push(exportedName);
    content = content.replace(
      new RegExp(`export\\s+(const|let|var|function|class)\\s+${exportedName}`, 'g'), 
      `$1 ${exportedName}`
    );
  }

  // Adicionar exportações nomeadas ao final do arquivo
  if (exportedNames.length > 0) {
    // Primeiro verifica se já existe um module.exports no arquivo
    if (!content.includes('module.exports =')) {
      // Se não existe, adicionamos as exportações nomeadas
      const exportStatements = exportedNames.map(name => `module.exports.${name} = ${name};`).join('\n');
      content += '\n\n' + exportStatements;
    } else {
      // Caso contrário, modificamos as exportações existentes
      exportedNames.forEach(name => {
        if (!content.includes(`module.exports.${name} =`)) {
          content = content.replace(
            /module\.exports(\s+=\s+\w+)/,
            `module.exports$1\nmodule.exports.${name} = ${name};`
          );
        }
      });
    }
  }

  // Converter export desestruturado: export { x, y }; -> module.exports.x = x; module.exports.y = y;
  content = content.replace(/export\s+\{\s*([^}]+)\s*\};?/g, (match, exports) => {
    const exportLines = exports.split(',')
      .map(item => {
        const trimmedItem = item.trim();
        return `module.exports.${trimmedItem} = ${trimmedItem};`;
      })
      .join('\n');
    return exportLines;
  });

  // Remover as definições de interface e type
  content = content.replace(/interface\s+[^{]*\{[^}]*\}\s*;?/g, '');
  content = content.replace(/type\s+[^=]*=[^;]*;/g, '');

  // Remover anotações de tipo em declarações de variáveis
  content = content.replace(/(const|let|var)\s+(\w+)\s*:\s*[^=;]+(=|;)/g, '$1 $2 $3');
  
  // Remover anotações de tipo em parâmetros de funções arrow
  content = content.replace(/(\([\w\s,]*)\s*:\s*[\w\.<>\[\]|, ]+(\s*[,\)])/g, '$1$2');
  
  // Lidar com várias anotações de tipo em parâmetros de função
  // Exemplo: (req: Request, res: Response, next: NextFunction)
  let lastContent = '';
  while (lastContent !== content) {
    lastContent = content;
    content = content.replace(/(\(\w+\s*):[\w\.<>\[\]|, ]+(\s*,|\))/g, '$1$2');
    content = content.replace(/,\s*(\w+\s*):[\w\.<>\[\]|, ]+(\s*,|\))/g, ', $1$2');
  }
  
  // Remover anotações de tipo em parâmetros de funções
  content = content.replace(/(\(.*?\))\s*:\s*[^\{]+\{/g, '$1 {');
  
  // Remover anotações de tipo em retornos de funções
  content = content.replace(/\)\s*:\s*[^{]+\{/g, ') {');
  
  // Remover tipos genéricos
  content = content.replace(/<[^>]+>/g, '');
  
  return content;
}

// Função para copiar um diretório recursivamente 
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Se for um arquivo TypeScript
      if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
        // Lê o conteúdo do arquivo
        let content = fs.readFileSync(srcPath, 'utf8');
        
        // Processa o conteúdo do arquivo TypeScript
        content = processTypeScriptContent(content);
        
        // Salva o arquivo com extensão .js
        const destPathJs = destPath.replace(/\.ts$/, '.js');
        fs.writeFileSync(destPathJs, content);
      } 
      // Copia outros arquivos diretamente
      else if (!entry.name.endsWith('.d.ts')) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Realiza a cópia direta de TypeScript para JavaScript
console.log('⚙️ Realizando conversão direta TS -> JS via cópia...');
copyDir(srcDir, distDir);
console.log('✅ Cópia direta de arquivos concluída');

// Cria o diretório de logs se necessário
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Finalização
console.log('✅ Build finalizado com sucesso!');

// Se estiver no ambiente Render, exibir informações adicionais
if (isRenderEnvironment) {
  console.log("\n=== Informações de Instalação ===");
  try {
    console.log(execSync('ls -la ./dist').toString());
  } catch (error) {
    console.error('❌ Erro ao listar arquivos:', error.message);
  }
  console.log("====================\n");
}

// Criar arquivo de verificação para confirmar build completo
fs.writeFileSync('./dist/build-info.json', JSON.stringify({
  buildDate: new Date().toISOString(),
  environment: isRenderEnvironment ? 'render' : 'local',
  success: true
}));
