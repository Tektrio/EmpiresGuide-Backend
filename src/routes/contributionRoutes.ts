import express from 'express';
import { 
  contributeStrategy, 
  reviewContribution, 
  getPendingContributions, 
  getStrategyHistory 
} from '../controllers/contributionController';
import { protect, ownerOrAdmin } from '../middleware/auth';

const router = express.Router();

// Rota para enviar contribuição - requer autenticação
router.post('/', protect, contributeStrategy);

// Rotas para gerenciar contribuições - requer permissão de administrador
router.get('/pending', protect, ownerOrAdmin, getPendingContributions);
router.put('/:id', protect, ownerOrAdmin, reviewContribution);

// Rota específica para aprovar contribuição - apenas para admin
router.put('/:id/approve', protect, ownerOrAdmin, (req, res) => {
  req.body.status = 'Aprovada';
  reviewContribution(req, res);
});

// Rota específica para rejeitar contribuição - apenas para admin
router.put('/:id/reject', protect, ownerOrAdmin, (req, res) => {
  req.body.status = 'Rejeitada';
  reviewContribution(req, res);
});

// Rota para visualizar histórico de contribuições - pública
router.get('/history/:matchupId', getStrategyHistory);

export default router; 