
// Tipos globais para o projeto
declare namespace Express {
  export interface Request {
    user?: any;
  }
}

// Adicionar suporte para propriedades em Request
declare namespace Express {
  export interface Request {
    body: any;
    params: any;
    query: any;
  }
}

// Definições globais
declare const global: {
  mongoose: any;
  mockMongooseEnabled?: boolean;
  [key: string]: any;
};

// Módulos sem tipos
declare module 'express-status-monitor';
