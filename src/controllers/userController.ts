import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { generateToken } from '../middleware/auth';
import mongoose from 'mongoose';

// @desc    Registrar um novo usuário
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Log da requisição para debug
  console.log('Requisição de registro recebida:', { name, email });

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('Usuário já existe:', email);
      res.status(400).json({ message: 'Usuário já existe' });
      return;
    }

    // Criar novo usuário com role padrão 'user' para registro público
    console.log('Criando novo usuário...');
    const user = await User.create({
      name,
      email,
      password,
      role: 'user', // Define role padrão como 'user' para novos registros
    });

    if (user) {
      const userId = user._id.toString();
      console.log('Usuário criado com sucesso:', userId);
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userId),
      });
    } else {
      console.log('Falha ao criar usuário - dados inválidos');
      res.status(400).json({ message: 'Dados de usuário inválidos' });
    }
  } catch (error: any) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: error.message || 'Erro ao registrar usuário' });
  }
};

// @desc    Autenticar usuário
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  console.log('Tentativa de login para:', email);

  try {
    // Verificar email e senha
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Usuário não encontrado:', email);
      res.status(401).json({ message: 'Email ou senha inválidos' });
      return;
    }

    console.log('Usuário encontrado, verificando senha...');
    
    try {
      const isMatch = await user.matchPassword(password);
      console.log('Resultado da verificação de senha:', isMatch);
      
      if (isMatch) {
        const userId = user._id.toString();
        console.log('Login bem-sucedido:', userId);
        
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(userId),
        });
      } else {
        console.log('Senha incorreta para:', email);
        res.status(401).json({ message: 'Email ou senha inválidos' });
      }
    } catch (matchError) {
      console.error('Erro na função matchPassword:', matchError);
      res.status(500).json({ message: 'Erro na verificação de senha' });
    }
  } catch (error: any) {
    console.error('Erro ao tentar autenticar:', error);
    res.status(500).json({ message: error.message || 'Erro ao autenticar' });
  }
};

// @desc    Obter perfil do usuário
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erro ao buscar perfil' });
  }
};

// @desc    Listar todos os usuários
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erro ao listar usuários' });
  }
};

/**
 * @desc    Verificar se o usuário atual é um administrador
 * @route   GET /api/users/admin-check
 * @access  Privado
 */
export const checkAdminStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Não autorizado',
        isAdmin: false
      });
    }
    
    // Verificar se o usuário é admin
    const isAdmin = user.role === 'admin';
    
    res.status(200).json({
      success: true,
      isAdmin
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao verificar status de admin',
      error: error.message,
      isAdmin: false
    });
  }
}; 