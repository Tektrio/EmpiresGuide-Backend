import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Estendendo a interface Request para incluir o usuário
declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

// Middleware para proteger rotas
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrair token do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbacksecret') as { id: string };

      // Buscar o usuário pelo ID
      const user = await User.findById(decoded.id);
      
      if (!user) {
        res.status(401).json({ message: 'Usuário não encontrado' });
        return;
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token inválido' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
    return;
  }
};

// Middleware para verificar se o usuário é owner ou admin
export const ownerOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && (req.user.role === 'owner' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado: permissão insuficiente' });
  }
};

// Middleware para verificar se o usuário é owner
export const ownerOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado: apenas owner pode acessar este recurso' });
  }
};

// Gerar token JWT
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallbacksecret', {
    expiresIn: '30d',
  });
}; 