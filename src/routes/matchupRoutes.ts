import express from 'express';
import {
  getMatchups,
  getMatchupByCivs,
  getMatchupsByCiv,
  getStrategiesByType,
  getMatchupStats,
  getMatchupsByMapType,
  updateMatchup,
  addMatchup,
  deleteMatchup,
  deleteMapType,
  deleteStrategy,
  searchMatchups
} from '../controllers/matchupController';
import {
  rateStrategy,
  getStrategyRatings,
  getTopRatedStrategies
} from '../controllers/ratingController';
import { getMatchupStrategy } from '../controllers/StrategyController';
import { protect, ownerOrAdmin } from '../middleware/auth';

const router = express.Router();

// Rotas públicas
// Rota para obter todos os matchups com paginação e filtros
router.get('/', getMatchups);

// Rota para obter estatísticas dos matchups
router.get('/stats', getMatchupStats);

// Rota para busca avançada de matchups
router.post('/search', searchMatchups);

// Rota para obter as estratégias mais bem avaliadas
router.get('/top-rated', getTopRatedStrategies);

// Rota para obter estratégias por tipo (ataque/defesa)
router.get('/strategies/:type', getStrategiesByType);

// Rota para estratégia de confronto específico
router.get('/strategy', getMatchupStrategy);

// Rota para obter matchups por tipo de mapa
router.get('/maps/:mapType', getMatchupsByMapType);

// Rota para obter todos os matchups de uma civilização
router.get('/civilization/:civ', getMatchupsByCiv);

// Rota para obter matchup específico entre duas civilizações
router.get('/:civ1/:civ2', getMatchupByCivs);

// Rota para obter avaliações de uma estratégia específica
router.get('/:civ1/:civ2/ratings/:strategyType/:civilization', getStrategyRatings);

// Rotas protegidas (requerem autenticação)
// Rota para adicionar um novo matchup
router.post('/', protect, addMatchup);

// Rota para avaliar uma estratégia
router.post('/:civ1/:civ2/rate', protect, rateStrategy);

// Rota para excluir um tipo de mapa específico de um matchup
router.delete('/:civ1/:civ2/maps/:mapName', protect, deleteMapType);

// Rota para excluir uma estratégia alternativa específica
router.delete('/:civ1/:civ2/strategies/:strategyType/:civilization', protect, deleteStrategy);

// Rota para atualizar um matchup existente
router.put('/:civ1/:civ2', protect, updateMatchup);

// Rotas que requerem privilégios de administrador
// Rota para excluir um matchup específico
router.delete('/:civ1/:civ2', protect, ownerOrAdmin, deleteMatchup);

export default router; 