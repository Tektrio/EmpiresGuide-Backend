import app from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3001;

// Iniciar o servidor após conectar ao banco de dados
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Executar o servidor
startServer(); 