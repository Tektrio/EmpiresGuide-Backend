import express from 'express';
import dotenv from 'dotenv';
// @ts-ignore
import statusMonitor from 'express-status-monitor';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import contributionRoutes from './routes/contributionRoutes';
import matchupRoutes from './routes/matchupRoutes';
import strategyRoutes from './routes/strategyRoutes';
import strategyGuideRoutes from './routes/strategyGuideRoutes';
import healthRoutes from './routes/health';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Express Status Monitor para monitoramento
if (process.env.NODE_ENV === 'production') {
  app.use(statusMonitor());
}

// Middleware
app.use(express.json());

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Middleware para verificar o estado da conexão com o banco de dados
const dbConnectionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Lista de rotas que devem funcionar mesmo sem banco de dados
  const nonDbRoutes = [
    '/',
    '/api/ping',
    '/health'
  ];
  
  // Se o caminho está na lista de rotas não dependentes de banco, seguir adiante
  if (nonDbRoutes.includes(req.path)) {
    return next();
  }
  
  // Verificar se o banco de dados está conectado
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    // Para APIs que retornam JSON
    if (req.path.startsWith('/api/')) {
      return res.status(503).json({
        status: 'error',
        message: 'Serviço de banco de dados indisponível. Tente novamente mais tarde.',
        isDbConnected: false,
        allowedRoutes: nonDbRoutes,
        code: 'DB_CONNECTION_ERROR'
      });
    }
    
    // Para rotas que renderizam HTML
    return res.status(503).send('Serviço de banco de dados indisponível. Tente novamente mais tarde.');
  }
  
  // Banco de dados está conectado, continuar
  next();
};

// Rotas de health check
app.use('/health', healthRoutes);
app.get('/api/ping', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Servidor online',
    timestamp: new Date().toISOString()
  });
});

// Middleware para verificar status do MongoDB
// Se for null, respondemos com erro 503 para rotas que precisam de banco de dados
app.use((req, res, next) => {
  // Exclui rotas que não precisam de banco de dados
  if (
    req.path === '/' || 
    req.path === '/api/ping' || 
    req.path.startsWith('/health')
  ) {
    return next();
  }

  // Verificar se há uma conexão global (definida no mongoose)
  if (
    !global.mongoose || 
    !global.mongoose.connection || 
    global.mongoose.connection.readyState !== 1
  ) {
    // Responder com erro de serviço temporariamente indisponível
    return res.status(503).json({
      status: 'error',
      message: 'Database service temporarily unavailable',
      timestamp: new Date().toISOString()
    });
  }

  next();
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/matchups', matchupRoutes);
app.use('/api/strategies', strategyRoutes);
app.use('/api/guides', strategyGuideRoutes);

// Rota básica de teste
app.get('/', (req, res) => {
  // Verificar status da conexão com o banco de dados
  const dbConnected = global.mongoose && 
                     global.mongoose.connection && 
                     global.mongoose.connection.readyState === 1;

  res.json({ 
    message: 'API de Estratégias para Age of Empires IV',
    version: '1.0.0',
    status: dbConnected ? 'fully_operational' : 'limited_service',
    timestamp: new Date().toISOString(),
    db_status: dbConnected ? 'connected' : 'disconnected',
    endpoints: [
      '/api/users - Gerenciamento de usuários',
      '/api/auth - Autenticação e verificação de usuários',
      '/api/contributions - Sistema de contribuição comunitária',
      '/api/matchups - Configurações de matchups de civilizações',
      '/api/strategies - Estratégias gerais',
      '/api/guides - Guias de estratégia'
    ]
  });
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint não encontrado',
    path: req.path
  });
});

// Aplicar middleware de verificação de banco de dados após rotas básicas
app.use(dbConnectionMiddleware);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada'
  });
});

export default app;