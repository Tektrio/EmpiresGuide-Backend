import express from 'express';
import {
  getComprehensiveStrategy,
  getCivilizationDetails,
  getCivilizationLandmarks,
  getEraStrategy,
  getMatchupStrategy,
  getMapStrategy,
  getExampleStrategy
} from '../controllers/StrategyController';

const router = express.Router();

// Rota para gerar estratégia completa
router.post('/comprehensive', getComprehensiveStrategy);

// Rota para gerar estratégia de exemplo
router.post('/example', getExampleStrategy);

// Rotas para civilizações
router.get('/civilizations/:id', getCivilizationDetails);
router.get('/civilizations/:id/landmarks', getCivilizationLandmarks);
router.get('/civilizations/:civId/era/:era', getEraStrategy);

// Rota para confrontos
router.get('/matchups/:playerCiv/:enemyCiv', getMatchupStrategy);

// Rota para mapas
router.get('/maps/:mapId', getMapStrategy);

export default router; 