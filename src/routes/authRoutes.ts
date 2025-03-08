import express from 'express';
import { authUser, getUserProfile, checkAdminStatus } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Rota de login - pública
router.post('/login', authUser);

// Rota para verificar status de autenticação - privada
router.get('/check', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Usuário autenticado',
    isAuthenticated: true
  });
});

// Rota para verificar status de admin - privada
router.get('/check-admin', protect, checkAdminStatus);

// Rota para obter perfil do usuário - privada
router.get('/profile', protect, getUserProfile);

export default router; 