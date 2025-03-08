#!/bin/bash

# Script para iniciar o projeto EmpiresGuide

# Verifica a versão do Node.js
NODE_VERSION=$(node -v)
REQUIRED_VERSION="v18.20.7"

echo "Verificando a versão do Node.js..."
if [ "$NODE_VERSION" != "$REQUIRED_VERSION" ]; then
    echo "AVISO: Versão do Node.js incorreta. Versão atual: $NODE_VERSION, Versão necessária: $REQUIRED_VERSION"
    
    # Verificar se o NVM está instalado
    if command -v nvm &> /dev/null; then
        echo "Tentando usar o NVM para mudar a versão do Node.js..."
        nvm use 18.20.7 || nvm install 18.20.7 && nvm use 18.20.7
    else
        echo "NVM não encontrado. Por favor, instale o Node.js v18.20.7 manualmente."
        exit 1
    fi
else
    echo "Versão do Node.js correta: $NODE_VERSION"
fi

# Verificar a versão do React
echo "Verificando a versão do React..."
REACT_VERSION=$(grep -m 1 '"react":' /package.json | cut -d '"' -f 4)
REQUIRED_REACT_VERSION="^18.2.0"

if [[ "$REACT_VERSION" != "$REQUIRED_REACT_VERSION" ]]; then
    echo "AVISO: Versão do React incorreta. Versão atual: $REACT_VERSION, Versão necessária: $REQUIRED_REACT_VERSION"
    echo "Ajustando a versão do React..."
    cd  && npm install react@18.2.0 react-dom@18.2.0 && cd ..
else
    echo "Versão do React correta: $REACT_VERSION"
fi

# Verificar e instalar as dependências
echo "Verificando e instalando as dependências..."
if [ ! -d "node_modules" ] || [ ! -d "/node_modules" ] || [ ! -d "EmpiresGuide-Backend/node_modules" ]; then
    echo "Instalando todas as dependências..."
    npm run install:all
else
    echo "Dependências já instaladas."
fi

# Iniciar o projeto
echo "Iniciando o projeto..."
npm run dev

# Abrir o navegador após alguns segundos para dar tempo ao servidor iniciar


echo "Projeto iniciado com sucesso! O navegador será aberto automaticamente em alguns segundos." 