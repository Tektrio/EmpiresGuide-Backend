import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

// Importação de rotas
import strategyRoutes from './routes/strategyRoutes';
import userRoutes from './routes/userRoutes';
import matchupRoutes from './routes/matchupRoutes';
import contributionRoutes from './routes/contributionRoutes';
import strategyGuideRoutes from './routes/strategyGuideRoutes';
import healthRoutes from './routes/health';

// Inicializar o aplicativo Express
const app = express();

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

// Configuração do Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(helmet());

// Configurar o logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// Rotas básicas
app.get('/', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;
  const dbStatus = isDbConnected ? 'Conectado' : 'Desconectado';
  const dbType = global.mockMongooseEnabled ? 'Em Memória (Fallback)' : 'MongoDB Atlas';
  
  res.status(200).send(`
    <html>
      <head>
        <title>EmpiresGuide API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
          .status.ok { background-color: #d4edda; color: #155724; }
          .status.error { background-color: #f8d7da; color: #721c24; }
          .info { background-color: #e2e3e5; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <h1>EmpiresGuide API</h1>
        <div class="status ${isDbConnected ? 'ok' : 'error'}">
          <strong>Banco de Dados:</strong> ${dbStatus} (${dbType})
        </div>
        <div class="info">
          <strong>Ambiente:</strong> ${process.env.NODE_ENV}
        </div>
        <div class="info">
          <strong>Endpoints Ativos:</strong>
          <ul>
            <li>/api/strategies - Estratégias para civilizações</li>
            <li>/api/matchups - Confrontos entre civilizações</li>
            <li>/api/users - Gestão de usuários</li>
            <li>/api/contributions - Contribuições da comunidade</li>
            <li>/api/guides - Guias estratégicos completos</li>
          </ul>
        </div>
        <p>© Tek Trio 2025 - Todos os direitos reservados.</p>
      </body>
    </html>
  `);
});

app.get('/api/ping', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'API online' });
});

app.get('/health', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;
  res.status(200).json({ 
    status: 'ok', 
    dbConnected: isDbConnected,
    dbType: global.mockMongooseEnabled ? 'memory' : 'mongodb',
    env: process.env.NODE_ENV
  });
});

// Aplicar middleware de verificação de banco de dados após rotas básicas
app.use(dbConnectionMiddleware);

// Rota de health check
app.use('/health', healthRoutes);

// Rotas da API
app.use('/api/strategies', strategyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matchups', matchupRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/guides', strategyGuideRoutes);

// Middleware de tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Erro interno do servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Middleware para rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada'
  });
});

export default app;