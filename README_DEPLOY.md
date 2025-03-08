# Deploy no Render - EmpiresGuide Backend

Este backend está configurado para ser implantado no Render usando um repositório GitHub.

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
   - Nome: `empiresguide-api` (ou outro nome de sua escolha)
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Variáveis de Ambiente** (Configure em "Environment" > "Environment Variables"):
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (O Render vai configurar automaticamente a porta)
   - `DATABASE`: `mongodb+srv://tektrio2023:<PASSWORD>@age4.jx5tt.mongodb.net/?retryWrites=true&w=majority&appName=age4`
   - `DATABASE_PASSWORD`: `EFsXKM83w4zMmkTJ`
   - `JWT_SECRET`: `tek_trio_2025_tokensecret_empiresguide_secure` (ou sua chave segura)
   - `USE_COMPLETE_MATCHUPS`: `true`

5. **Configurações Adicionais**:
   - Plano: escolha o plano que deseja usar (Free é suficiente para testes)
   - Auto-Deploy: Habilite para implantar automaticamente quando houver novos commits
   - Disco: Adicione um disco de 1GB para armazenar uploads em `/uploads`

6. **Clique em "Create Web Service"**

## Verificação do Deploy

Após o deploy, você pode verificar se a API está funcionando acessando:
- `https://seu-servico.onrender.com/api/ping` (deve retornar status 200)
- `https://seu-servico.onrender.com/` (deve retornar informações básicas da API)

## Monitoramento e Logs

- No dashboard do Render, acesse a seção "Logs" para verificar os logs da aplicação
- Configure alertas para ser notificado sobre problemas
- Verifique o endpoint `/health` para monitoramento detalhado

## Desenvolvimento Local

Para executar o projeto localmente:

```bash
# Instalar dependências
npm install

# Criar arquivo .env baseado no .env.render
cp .env.render .env
# Edite o arquivo .env com suas configurações

# Iniciar em modo de desenvolvimento
npm run dev
```

## Solução de Problemas

Se o deploy falhar, verifique:
1. Logs no Render para identificar erros
2. Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas
3. Verifique se o MongoDB está acessível do Render
4. Certifique-se de que o disco foi montado corretamente para os uploads

### Problemas de Tipagem TypeScript

Se você encontrar erros relacionados a declarações de tipo durante o build:

1. Verifique se o package.json contém as dependências de desenvolvimento necessárias:
   ```json
   "devDependencies": {
     "@types/express": "^4.17.21",
     "@types/cors": "^2.8.17",
     "@types/node": "^20.11.24",
     "@types/jsonwebtoken": "^9.0.9",
     "@types/bcryptjs": "^2.4.6"
   }
   ```

2. Se os erros persistirem, você pode:
   - Executar o script `prebuild.sh` localmente para instalar os tipos
   - Verificar se a pasta `src/types` contém as declarações necessárias
   - Temporariamente, desativar verificações estritas de tipo no `tsconfig.json`

3. Para forçar a reinstalação de tipos no Render, você pode usar:
   ```
   rm -rf node_modules/@types && npm install
   ```
