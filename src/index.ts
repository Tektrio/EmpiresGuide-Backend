import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
import { checkDatabaseConfig } from './utils/checkDbConfig';

// Carregar variáveis de ambiente
dotenv.config();

// Verificar configuração do banco de dados
const dbConfigValid = checkDatabaseConfig();

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;

// Definir o host - No Render.com, precisamos escutar em 0.0.0.0
let host = '0.0.0.0'; // Sempre escutar em todas as interfaces no ambiente de produção

// Iniciar o servidor após conectar ao banco de dados
const startServer = async () => {
  try {
    // Verificar configuração do banco de dados
    console.log(`✅ Verificação de configuração do banco de dados: ${dbConfigValid ? 'Válida' : 'Inválida mas continuando'}`);
    
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
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log(`📊 Modo: ${process.env.NODE_ENV}`);
      console.log(`🔗 API URL: http://${host === '0.0.0.0' ? 'localhost' : host}:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    
    // Tentar iniciar o servidor mesmo com erro
    try {
      app.listen(PORT, host, () => {
        console.log(`✅ Servidor de emergência rodando na porta ${PORT}`);
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