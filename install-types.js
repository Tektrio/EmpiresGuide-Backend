#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Instalando dependências de tipos...');

// Lista de tipos a serem instalados
const typePackages = [
  '@types/node',
  '@types/express',
  '@types/cors',
  '@types/jsonwebtoken',
  '@types/bcryptjs',
  '@types/mongoose',
  '@types/morgan'
];

// Verificar se os tipos já estão instalados
function isPackageInstalled(packageName) {
  try {
    const output = execSync(`npm list ${packageName} --depth=0`).toString();
    return !output.includes('empty');
  } catch (error) {
    return false;
  }
}

// Instalar tipos
for (const packageName of typePackages) {
  const isInstalled = isPackageInstalled(packageName);
  
  if (isInstalled) {
    console.log(`✅ ${packageName} já está instalado`);
  } else {
    console.log(`⏳ Instalando ${packageName}...`);
    try {
      execSync(`npm install --no-save ${packageName}`, { stdio: 'inherit' });
      console.log(`✅ ${packageName} instalado com sucesso`);
    } catch (error) {
      console.error(`❌ Erro ao instalar ${packageName}: ${error.message}`);
    }
  }
}

// Criar arquivo de mapeamento de tipos
const typeFilePath = './src/types/global.d.ts';
if (!fs.existsSync('./src/types')) {
  fs.mkdirSync('./src/types', { recursive: true });
}

const globalTypesContent = `
// Tipos globais para o projeto
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

// Estendendo tipos para o Express
declare module "express-serve-static-core" {
  interface Response {
    status(code: number): Response;
    json(data: any): Response;
    send(body: any): Response;
  }
}

// Definições globais
declare const global: {
  mongoose: any;
  mockMongooseEnabled?: boolean;
  [key: string]: any;
};

// Módulos sem tipos
declare module 'express-status-monitor';

// Tipos para express-serve-static-core
declare module "express-serve-static-core" {
  interface Request {
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
  
  // Para corrigir o erro de NextFunction
  type NextFunction = (err?: any) => void;
}
`;

fs.writeFileSync(typeFilePath, globalTypesContent);
console.log(`✅ Arquivo de tipos globais criado em ${typeFilePath}`);

console.log('✅ Instalação de tipos concluída!'); 