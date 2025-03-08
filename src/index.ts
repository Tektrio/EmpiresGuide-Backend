import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';
import { checkDatabaseConfig } from './utils/checkDbConfig';

// Carregar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3001;

// Iniciar o servidor após conectar ao banco de dados
const startServer = async () => {
  try {
    // Verificar configuração do banco de dados
    const isDbConfigValid = checkDatabaseConfig();
    if (!isDbConfigValid) {
      console.warn('⚠️ Configuração de banco de dados potencialmente inválida');
    }
    
    // Conectar ao banco de dados
    const connection = await connectDB();
    
    // Mesmo se a conexão falhar, continuamos a iniciar o servidor
    // (connection será null se a conexão falhar completamente)
    if (!connection) {
      console.warn('⚠️ Iniciando servidor com funcionalidade limitada devido a problemas com o banco de dados');
    }
    
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log(`📊 Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API URL: http://localhost:${PORT}`);
      
      // Adicionar informações sobre o status da API
      if (!connection) {
        console.log('⚠️ API em MODO DE EMERGÊNCIA - Algumas funcionalidades não estarão disponíveis');
      }
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    console.log('🔄 Tentando iniciar em modo de emergência...');
    
    // Tentar iniciar o servidor mesmo com erro
    try {
      app.listen(PORT, () => {
        console.log(`✅ Servidor de emergência rodando na porta ${PORT}`);
        console.log('⚠️ API em MODO DE EMERGÊNCIA - Funcionalidade extremamente limitada');
      });
    } catch (emergencyError) {
      console.error('❌ Falha crítica ao iniciar o servidor de emergência:', emergencyError);
      process.exit(1);
    }
  }
};

startServer(); 