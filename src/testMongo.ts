import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verificar variáveis de ambiente
console.log('Variáveis de ambiente:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não está definido no arquivo .env');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
    
    // Listar as coleções do banco de dados
    if (conn.connection.db) {
      const collections = await conn.connection.db.listCollections().toArray();
      console.log('Coleções disponíveis:');
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
      
      // Contar documentos em cada coleção
      for (const collection of collections) {
        const count = await conn.connection.db.collection(collection.name).countDocuments();
        console.log(`Coleção ${collection.name}: ${count} documentos`);
      }
    } else {
      console.log('Não foi possível acessar as coleções do banco de dados');
    }
    
    // Fechar a conexão
    await mongoose.connection.close();
    console.log('Conexão fechada');
    
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

connectDB(); 