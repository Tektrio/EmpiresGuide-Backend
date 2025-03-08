import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Iniciando teste de conexão com MongoDB...');
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const connectAndTest = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
    }

    // Conectar ao MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Conectado com sucesso!');
    console.log('Host de conexão:', conn.connection.host);
    console.log('Nome do banco de dados:', conn.connection.name);
    
    // Verificar coleções disponíveis
    if (conn.connection.db) {
      const collections = await conn.connection.db.listCollections().toArray();
      console.log('\nColeções disponíveis:');
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
      
      // Contar documentos em cada coleção
      console.log('\nContagem de documentos por coleção:');
      for (const collection of collections) {
        const count = await conn.connection.db.collection(collection.name).countDocuments();
        console.log(`- ${collection.name}: ${count} documentos`);
      }
    }
    
    // Fechar a conexão
    await mongoose.connection.close();
    console.log('\nConexão fechada com sucesso');
    console.log('Teste de conexão concluído com êxito');
    
  } catch (error: any) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Não foi possível se conectar ao servidor MongoDB. Verifique:');
      console.error('1. Se as credenciais estão corretas');
      console.error('2. Se o endereço IP atual tem permissão para acessar o cluster');
      console.error('3. Se o cluster MongoDB está ativo e acessível');
    }
  }
};

// Executar teste de conexão
connectAndTest(); 