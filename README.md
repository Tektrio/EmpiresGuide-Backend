# EmpiresGuide-Backend

Backend da aplicação EmpiresGuide, desenvolvido com Node.js, Express e MongoDB.

## Requisitos

- Node.js v18.20.7
- MongoDB

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/EmpiresGuide-Backend.git
cd EmpiresGuide-Backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3001
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
USE_COMPLETE_MATCHUPS=false
```

4. Execute o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o código TypeScript
- `npm start`: Inicia o servidor em modo de produção

## Deploy

Este projeto está configurado para deploy no Render. Certifique-se de configurar as seguintes variáveis de ambiente no Render:

- `PORT`: 3001 (ou outra porta de sua preferência)
- `MONGODB_URI`: sua string de conexão do MongoDB
- `JWT_SECRET`: sua chave secreta para JWT
- `NODE_ENV`: production
- `USE_COMPLETE_MATCHUPS`: false (ou true, conforme sua necessidade)

## Estrutura do Projeto

- `src/`: Código fonte
  - `controllers/`: Controladores da aplicação
  - `models/`: Modelos de dados
  - `routes/`: Rotas da API
  - `middlewares/`: Middlewares personalizados
  - `utils/`: Utilitários
  - `index.ts`: Ponto de entrada da aplicação 