#!/bin/bash

# Script para instalar dependências de tipos antes do build

echo "Instalando dependências de tipos..."
npm install --save-dev @types/express @types/cors @types/node @types/jsonwebtoken @types/bcryptjs @types/jest @types/supertest

echo "Verificando pacotes instalados..."
npm list @types/express
npm list @types/cors
npm list @types/node
npm list @types/jest

echo "Criando pasta de tipos..."
mkdir -p src/types

echo "Instalando pacotes necessários para build..."
npm install --save express-serve-static-core @types/express-serve-static-core

echo "Concluído pré-build." 