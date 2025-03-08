import express, { Request, Response, NextFunction } from 'express';
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
import ratingRoutes from './routes/ratingRoutes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Express Status Monitor para monitoramento
if (process.env.NODE_ENV === 'production') {
  app.use(statusMonitor());
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(helmet());

// Middleware para verificar o estado da conexão com o banco de dados
const dbConnectionMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
app.get('/api/ping', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Servidor online',
    timestamp: new Date().toISOString()
  });
});

// Middleware para verificar status do MongoDB
// Se for null, respondemos com erro 503 para rotas que precisam de banco de dados
app.use((req: Request, res: Response, next: NextFunction) => {
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
app.use('/api/ratings', ratingRoutes);

// Rota básica de teste
app.get('/', (req: Request, res: Response) => {
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
      '/api/guides - Guias de estratégia',
      '/api/ratings - Avaliações de estratégias'
    ]
  });
});

// Middleware para tratar rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint não encontrado',
    path: req.path
  });
});

// Aplicar middleware de verificação de banco de dados após rotas básicas
app.use(dbConnectionMiddleware);

// Middleware para rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada'
  });
});

// Middleware de tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Erro interno do servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;