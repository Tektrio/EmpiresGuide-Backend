# Deploy no Render

Este backend está configurado para ser implantado no Render. Siga as etapas abaixo:

1. Faça o fork deste repositório no GitHub
2. Crie uma conta no Render (https://render.com)
3. No dashboard do Render, escolha "New Web Service"
4. Conecte com seu repositório GitHub
5. Configure as seguintes variáveis de ambiente:
   - NODE_ENV=production
   - PORT=3001
   - MONGODB_URI=sua_uri_do_mongodb
   - JWT_SECRET=sua_chave_secreta
   - USE_COMPLETE_MATCHUPS=false (ou true, se desejar)

O arquivo render.yaml já está configurado com as configurações básicas.

## Desenvolvimento Local

Para executar o projeto localmente:

```bash
# Instalar dependências
npm install

# Iniciar em modo de desenvolvimento
npm run dev
```

Certifique-se de configurar o arquivo .env com as variáveis necessárias.
