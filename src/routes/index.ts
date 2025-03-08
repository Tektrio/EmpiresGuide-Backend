import express from 'express';
import userRoutes from './userRoutes';
import strategyRoutes from './strategyRoutes';
import strategyGuideRoutes from './strategyGuideRoutes';
import matchupRoutes from './matchupRoutes';

const router = express.Router();

// Teste se a API está funcionando
router.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Configurar todas as rotas
router.use('/users', userRoutes);
router.use('/strategies', strategyRoutes);
router.use('/guides', strategyGuideRoutes);
router.use('/matchups', matchupRoutes);

export default router; 