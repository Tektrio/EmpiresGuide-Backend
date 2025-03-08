import { IUser } from '../models/User';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      body: any;
      params: any;
      query: any;
    }
  }

  // Adicionando mongoose global para acesso em qualquer lugar
  var mongoose: typeof mongoose;
}

// Necessário para fazer este arquivo ser um módulo ES
export {}; 