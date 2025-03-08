
// Tipos globais para o projeto
declare namespace Express {
  export interface Request {
    user?: any;
    body: any;
    params: any;
    query: any;
    path: string;
    headers: {
      authorization?: string;
      [key: string]: string | undefined;
    };
  }
}

// Estendendo tipos para o Express
declare module "express-serve-static-core" {
  interface Response {
    status(code: number): Response;
    json(data: any): Response;
    send(body: any): Response;
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

// Tipos para express-serve-static-core
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
    body: any;
    params: any;
    query: any;
    path: string;
    headers: {
      authorization?: string;
      [key: string]: string | undefined;
    };
  }
  
  // Para corrigir o erro de NextFunction
  type NextFunction = (err?: any) => void;
}
