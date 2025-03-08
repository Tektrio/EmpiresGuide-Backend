import { Request, Response } from 'express';
import { authUser } from '../../controllers/userController';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock do modelo User
jest.mock('../../models/User', () => ({
  findOne: jest.fn(),
}));

// Mock do bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

// Mock do jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authUser', () => {
    test('returns 401 if user not found', async () => {
      // Configura o mock para retornar null (usuário não encontrado)
      (User.findOne as jest.Mock).mockResolvedValue(null);
      
      await authUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
    });

    test('returns 401 if password does not match', async () => {
      // Mock usuário encontrado
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
        password: 'hashedPassword',
        matchPassword: jest.fn().mockResolvedValue(false)
      });
      
      await authUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(401);
    });
    
    test('returns token if login successful', async () => {
      // Mock usuário encontrado e senha correta
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password: 'hashedPassword',
        matchPassword: jest.fn().mockResolvedValue(true)
      });
      
      (jwt.sign as jest.Mock).mockReturnValue('fake-token');
      
      await authUser(req as Request, res as Response);
      
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'fake-token'
        })
      );
    });
  });
});