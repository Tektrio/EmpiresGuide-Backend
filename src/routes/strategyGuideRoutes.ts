import express from 'express';
import {
  generateComprehensiveStrategy,
  getCivilizationGuide,
  getEraGuide,
  getMatchupGuide,
  getMapGuide,
  getVictoryGuide,
  getModGuide
} from '../controllers/StrategyGuideController';

const router = express.Router();

// Rota para gerar estratégia completa
router.post('/comprehensive', generateComprehensiveStrategy);

// Rotas para guias específicos
router.get('/civilizations/:civId', getCivilizationGuide);
router.get('/civilizations/:civId/era/:era', getEraGuide);
router.get('/matchups/:playerCiv/:enemyCiv', getMatchupGuide);
router.get('/maps/:mapId/:civId', getMapGuide);
router.get('/victory/:conditionId/:civId', getVictoryGuide);
router.get('/mods/:modId/:civId', getModGuide);

export default router; 