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

  // Define variável mongoose no objeto global
  var mongoose: any;
}

// Necessário para fazer este arquivo ser um módulo ES
export {}; 