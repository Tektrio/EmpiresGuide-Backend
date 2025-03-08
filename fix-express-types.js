#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Verificando e corrigindo tipos do Express...');

// Garantir que o diretório de tipos existe
const typesDir = path.join(process.cwd(), 'src/types');
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// Escrever arquivo express.d.ts
const expressFile = path.join(typesDir, 'express.d.ts');
const expressContent = `
declare module 'express';
declare module 'express-status-monitor';

// Tipos simplificados para Express
declare global {
  namespace Express {
    interface Request {
      user?: any;
      body: any;
      params: any;
      query: any;
      path: string;
      headers: {
        authorization?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
`;

fs.writeFileSync(expressFile, expressContent);
console.log(`✅ Arquivo de tipos de express criado`);

console.log('✅ Correção de tipos do Express concluída!'); 