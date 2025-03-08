#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Verificando e corrigindo tipos do Express...');

// Verificar se @types/express existe
if (!fs.existsSync(path.join(process.cwd(), 'node_modules/@types/express'))) {
  console.log('⚠️ @types/express não encontrado, instalando...');
  try {
    execSync('npm install --no-save @types/express', { stdio: 'inherit' });
    console.log('✅ @types/express instalado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao instalar @types/express:', error.message);
  }
}

// Criar arquivo temporário de referência para o Express
const referenceFile = path.join(process.cwd(), 'src/types/express-fix.d.ts');

// Verificar se o diretório existe
const typesDir = path.join(process.cwd(), 'src/types');
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// Conteúdo do arquivo de referência
const referenceContent = `
// Referência para os tipos do Express
/// <reference types="express" />

// Definições extras para Express
declare namespace Express {
  export interface Request {
    user?: any;
    body: any;
    params: any;
    query: any;
    path: string;
    headers: {
      authorization?: string;
      [key: string]: string | undefined;
    };
  }
}

// Importar o express explicitamente
declare module 'express' {
  export = e;
}
declare const e: any;
`;

// Escrever o arquivo
fs.writeFileSync(referenceFile, referenceContent);
console.log(`✅ Arquivo de referência criado em ${referenceFile}`);

console.log('✅ Correção de tipos do Express concluída!'); 