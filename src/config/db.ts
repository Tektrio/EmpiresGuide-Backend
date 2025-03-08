import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import checkDatabaseConfig from '../utils/checkDbConfig';

// Verificar configuração
const isConfigValid = checkDatabaseConfig();

// Variável para armazenar o servidor em memória
let mongoServer: MongoMemoryServer | null = null;

const connectDB = async () => {
  try {
    // Verificar qual variável de ambiente está disponível
    let connectionString: string;
    
    if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
      // Formato usado no repositório Tek Trio 2025
      connectionString = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
      console.log('✅ Usando configuração oficial do banco de dados MongoDB Atlas');
    } else if (process.env.MONGODB_URI) {
      // Formato alternativo direto
      connectionString = process.env.MONGODB_URI;
      console.log('✅ Usando configuração de banco de dados do formato URI direto');
    } else {
      console.warn('⚠️ Nenhuma variável de ambiente de conexão com banco de dados definida!');
      
      // Verificar modo de tolerância
      const isToleranceMode = process.env.MONGODB_TOLERANCE_MODE === 'true';
      const allowMockInProduction = process.env.ALLOW_MOCK_DB_IN_PRODUCTION === 'true';
      
      if (isToleranceMode || process.env.NODE_ENV !== 'production' || allowMockInProduction) {
        // Iniciar banco em memória como fallback
        return connectMemoryDB();
      }
      
      throw new Error('Variáveis de ambiente de banco de dados não definidas');
    }
    
    // Opções da conexão para mais resiliência
    const connectOptions = {
      serverSelectionTimeoutMS: 10000, // 10 segundos (padrão é 30s)
      retryWrites: true,
      socketTimeoutMS: 45000, // 45 segundos
      family: 4 // Forçar IPv4
    };

    // Conectar ao MongoDB Atlas
    const conn = await mongoose.connect(connectionString, connectOptions);
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    
    // Tornar o mongoose disponível globalmente
    global.mongoose = mongoose;
    
    return conn;
  } catch (error: any) {
    console.error(`❌ Erro ao conectar ao MongoDB Atlas: ${error.message}`);
    
    // Em produção, verificar se modo de tolerância está ativo
    const isToleranceMode = process.env.MONGODB_TOLERANCE_MODE === 'true';
    const allowMockInProduction = process.env.ALLOW_MOCK_DB_IN_PRODUCTION === 'true';
    
    if (process.env.NODE_ENV === 'production') {
      if (isToleranceMode || allowMockInProduction) {
        console.warn('⚠️ Falha na conexão com MongoDB em ambiente de produção, usando banco em memória como fallback de emergência');
        return connectMemoryDB();
      } else {
        console.error('❌ Falha na conexão com MongoDB em ambiente de produção. Configure MONGODB_TOLERANCE_MODE=true para usar fallback');
        process.exit(1);
      }
    } else {
      // Em desenvolvimento, tentar usar o banco em memória automaticamente
      console.warn('⚠️ Falha na conexão com MongoDB em ambiente de desenvolvimento, usando banco em memória como fallback');
      return connectMemoryDB();
    }
  }
};

// Função para conectar ao banco em memória para desenvolvimento ou fallback
const connectMemoryDB = async () => {
  try {
    // Iniciar servidor MongoDB em memória
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Conectar ao banco em memória
    await mongoose.connect(uri);
    
    console.log(`✅ Conectado ao banco de dados em memória: memory-mock-db`);
    
    // Tornar o mongoose disponível globalmente
    global.mongoose = mongoose;
    
    return mongoose.connection;
  } catch (err: any) {
    console.error(`❌ Erro ao conectar ao banco em memória: ${err.message}`);
    process.exit(1);
  }
};

// Função para encerrar a conexão
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    
    // Se estiver usando o servidor em memória, encerrar
    if (mongoServer) {
      await mongoServer.stop();
      mongoServer = null;
    }
    
    console.log('✅ Conexão com o banco de dados encerrada');
  } catch (err: any) {
    console.error(`❌ Erro ao encerrar conexão com o banco: ${err.message}`);
  }
};

export { connectDB, disconnectDB }; 