
declare module 'express';
declare module 'express-status-monitor';

// Tipos simplificados para Express
declare global {
  namespace Express {
    interface Request {
      user?: any;
      body: any;
      params: any;
      query: any;
      path: string;
      headers: {
        authorization?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
