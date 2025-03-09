/**
 * Script de inicialização específico para o ambiente Render
 * Este arquivo é usado como uma camada adicional de segurança para evitar erros de sintaxe
 */

// Carregar variáveis de ambiente
require('dotenv').config();

// Importar dependências necessárias
const app = require('./dist/app');
const { connectDB } = require('./dist/config/db');

// Verificar configuração do banco de dados
const checkDbConfig = () => {
  const isToleranceMode = process.env.MONGODB_TOLERANCE_MODE === 'true';
  const allowMockInProduction = process.env.ALLOW_MOCK_DB_IN_PRODUCTION === 'true';
  
  if (isToleranceMode) {
    console.log('✅ Modo de tolerância MongoDB ativado');
    return true;
  }
  
  if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
    console.log('✅ Configuração de banco de dados no formato Tek Trio está presente');
    return true;
  }
  
  if (process.env.MONGODB_URI) {
    console.log('✅ Configuração de banco de dados no formato URI direto está presente');
    return true;
  }
  
  console.error('❌ Nenhuma configuração de banco de dados encontrada');
  
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Em ambiente de produção, configuração de banco de dados é obrigatória!');
    return false;
  }
  
  return false;
};

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;

// Definir o host - No Render.com, precisamos escutar em 0.0.0.0
let host = '0.0.0.0'; // Sempre escutar em todas as interfaces no ambiente de produção

// Iniciar o servidor após conectar ao banco de dados
const startServer = async () => {
  try {
    // Verificar configuração do banco de dados
    const dbConfigValid = checkDbConfig();
    console.log('✅ Verificação de configuração do banco de dados: ' + (dbConfigValid ? 'Válida' : 'Inválida mas continuando'));
    
    // Conectar ao banco de dados
    await connectDB();
    
    // Definir handler para encerramento limpo
    process.on('SIGINT', async () => {
      console.log('Encerrando servidor...');
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('Encerrando servidor...');
      process.exit(0);
    });
    
    // Iniciar o servidor
    app.listen(PORT, host, () => {
      console.log('✅ Servidor rodando na porta ' + PORT);
      console.log('📊 Modo: ' + (process.env.NODE_ENV || 'development'));
      console.log('🔗 API URL: http://' + (host === '0.0.0.0' ? 'localhost' : host) + ':' + PORT);
      console.log('✅ API está pronta para receber conexões');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    
    // Tentar iniciar o servidor mesmo com erro
    try {
      app.listen(PORT, host, () => {
        console.log('✅ Servidor de emergência rodando na porta ' + PORT);
        console.log('⚠️ API em MODO DE EMERGÊNCIA - Funcionalidade extremamente limitada');
      });
    } catch (serverError) {
      console.error('❌ Falha ao iniciar o servidor de emergência:', serverError);
      process.exit(1);
    }
  }
};

// Iniciar o servidor
startServer();