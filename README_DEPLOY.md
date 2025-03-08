# Deploy no Render

Este backend está configurado para ser implantado no Render usando um repositório GitHub. Siga as etapas abaixo:

## Passo a Passo para Deploy

1. **Preparação do Repositório**:
   - Faça um fork deste repositório para sua conta GitHub
   - Clone o repositório para sua máquina local
   - Certifique-se de que todas as alterações foram commitadas e enviadas para o GitHub

2. **Configuração no Render**:
   - Crie uma conta no Render (https://render.com)
   - No dashboard do Render, escolha "New Web Service"
   - Clique em "Build and deploy from a Git repository"
   - Conecte sua conta GitHub e selecione o repositório
   - Escolha o branch que deseja implantar (geralmente `main` ou `master`)

3. **Configuração do Serviço**:
   - Nome: escolha um nome para seu serviço (ex: empiresguide-api)
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Variáveis de Ambiente** (Configure em "Environment" > "Environment Variables"):
   - `NODE_ENV`: `production`
   - `PORT`: `3001` (O Render vai configurar automaticamente a porta)
   - `MONGODB_URI`: sua URI completa do MongoDB
   - `JWT_SECRET`: uma chave secreta forte para os tokens JWT
   - `USE_COMPLETE_MATCHUPS`: `false` (ou `true`, se desejar)

5. **Configurações Adicionais**:
   - Plano: escolha o plano que deseja usar (Free é suficiente para testes)
   - Auto-Deploy: Deixe habilitado para implantar automaticamente quando houver novos commits

6. **Clique em "Create Web Service"**

## Verificação do Deploy

Após o deploy, você pode verificar se a API está funcionando acessando:
- `https://seu-servico.onrender.com/api/ping` (deve retornar status 200)
- `https://seu-servico.onrender.com/` (deve retornar informações básicas da API)

## Desenvolvimento Local

Para executar o projeto localmente:

```bash
# Instalar dependências
npm install

# Criar arquivo .env baseado no .env.example
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Iniciar em modo de desenvolvimento
npm run dev
```

## Solução de Problemas

Se o deploy falhar, verifique:
1. Logs no Render para identificar erros
2. Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas
3. Verifique se o MongoDB está acessível do Render
