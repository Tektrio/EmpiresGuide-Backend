/**
 * Script para popular o banco de dados com dados iniciais
 * Este script pode ser executado usando: node scripts/seed-database.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Utilizando o caminho do arquivo .env para carregar as variáveis de ambiente
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

// Conexão com o MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

// Função principal para executar o seed
const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Aqui você pode importar seus modelos e criar dados
    console.log('Iniciando o processo de seed...');
    
    // Exemplo: importar modelos e criar dados iniciais
    /*
    const User = require('../src/models/User');
    
    // Limpar coleções existentes (opcional)
    await User.deleteMany({});
    
    // Criar dados iniciais
    await User.create([
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'senha123', // em produção, deve ser hasheada
        role: 'admin'
      },
      {
        name: 'Usuário',
        email: 'user@example.com',
        password: 'senha123', // em produção, deve ser hasheada
        role: 'user'
      }
    ]);
    */
    
    console.log('Seed concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro durante o processo de seed:', error);
    process.exit(1);
  }
};

// Executar o seed
seedDatabase(); 