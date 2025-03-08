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
      console.warn('⚠️ Tentando iniciar mesmo com configuração de banco de dados potencialmente inválida');
    }
    
    // Conectar ao banco de dados
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log(`📊 Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer(); 