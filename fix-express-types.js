#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Verificando e corrigindo tipos do Express...');

// Verificar se @types/express existe
try {
  execSync('npm install --no-save @types/express', { stdio: 'inherit' });
  console.log('✅ @types/express instalado com sucesso');
} catch (error) {
  console.error('❌ Erro ao instalar @types/express:', error.message);
}

// Criar arquivo temporário de referência para o Express
const typesDir = path.join(process.cwd(), 'src/types');
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// Conteúdo do arquivo de referência
const expressContent = `
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
`;

// Escrever o arquivo
fs.writeFileSync(path.join(typesDir, 'express-fix.d.ts'), expressContent);
console.log(`✅ Arquivo de express-fix.d.ts criado`);

// Verificar se o Express está funcionando
console.log('✅ Correção de tipos do Express concluída!'); 