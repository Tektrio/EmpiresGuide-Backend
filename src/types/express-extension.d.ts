import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      body: any;
      params: any;
      query: any;
    }
  }
}

// Necessário para fazer este arquivo ser um módulo ES
export {}; 