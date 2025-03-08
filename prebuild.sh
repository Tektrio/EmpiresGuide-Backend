#!/bin/bash

# Script para instalar dependências de tipos antes do build

echo "Instalando dependências de tipos..."
npm install --save-dev @types/express @types/cors @types/node @types/jsonwebtoken @types/bcryptjs

echo "Verificando pacotes instalados..."
npm list @types/express
npm list @types/cors
npm list @types/node

echo "Concluído pré-build." 