const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
if (fs.existsSync('.env.render')) {
  console.log('Usando .env.render para configuração');
  dotenv.config({ path: '.env.render' });
} else if (fs.existsSync('.env')) {
  console.log('Usando .env para configuração');
  dotenv.config();
} else {
  console.log('Arquivo .env não encontrado');
}

// Função para testar a conexão
async function testMongoConnection() {
  // Obter a string de conexão
  let connectionString;
  if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
    connectionString = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    console.log('Usando configuração DATABASE + DATABASE_PASSWORD');
  } else if (process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
    console.log('Usando configuração MONGODB_URI');
  } else {
    console.error('Nenhuma variável de ambiente de conexão com MongoDB definida');
    return false;
  }

  console.log(`String de conexão: ${connectionString.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://***:***@')}`);

  const client = new MongoClient(connectionString, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000,
  });

  try {
    console.log('Tentando conectar ao MongoDB...');
    await client.connect();
    console.log('✅ Conectado com sucesso ao MongoDB!');
    
    // Testar acesso ao banco de dados
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log(`Collections disponíveis: ${collections.length}`);
    collections.forEach(col => console.log(` - ${col.name}`));

    await client.close();
    console.log('Conexão fechada.');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    return false;
  }
}

// Executar o teste
console.log('=== Teste de Conexão MongoDB ===');
testMongoConnection()
  .then(success => {
    if (success) {
      console.log('✅ Teste completado com sucesso!');
      process.exit(0);
    } else {
      console.error('❌ Teste falhou!');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Erro inesperado durante o teste:', err);
    process.exit(1);
  }); 