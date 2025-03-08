import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Estendendo a interface Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Verificar se o token está nos headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrair token do header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const secret = process.env.JWT_SECRET || 'defaultsecret';
      const decoded: any = jwt.verify(token, secret);

      // Adicionar usuário decodificado à requisição
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Token inválido ou expirado');
      res.status(401).json({
        success: false,
        message: 'Não autorizado, token inválido'
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Não autorizado, sem token'
    });
  }
};

// Middleware para verificar permissões de admin
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Não autorizado, permissão de administrador necessária'
    });
  }
}; 