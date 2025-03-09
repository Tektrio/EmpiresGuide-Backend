# EmpiresGuide Backend - Versão de Backup

Este é um backup funcional do backend do EmpiresGuide. Esta versão está configurada corretamente e deve ser usada em caso de problemas com a versão principal.

## Informações Importantes

- **Data do Backup**: Versão de março de 2024
- **Node.js**: v18.20.7
- **MongoDB**: Configurado para Atlas com fallback para banco em memória

## Configuração

Esta versão inclui:
- Configuração completa para MongoDB Atlas
- Modo de tolerância a falhas de conexão com o banco de dados
- Fallback para banco em memória em caso de problemas
- Todas as rotas e endpoints necessários para o funcionamento da aplicação

## Uso

1. Certifique-se de ter Node.js v18.20.7 instalado
2. Execute `npm install` para instalar as dependências
3. Configure o arquivo `.env` com suas credenciais (se necessário)
4. Execute `npm start` para iniciar o servidor

## Observações

Este backup foi criado especificamente para garantir uma versão estável do sistema, visto que a versão principal no GitHub apresentou problemas.

Para mais informações sobre o projeto principal, consulte o `README.md`. 