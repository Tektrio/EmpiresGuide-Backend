/**
 * Rota de health check para verificar o status do servidor
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const os = require('os');

// Health check detalhado
router.get('/', async (req, res) => {
  try {
    // Verificar status da conexão MongoDB
    const dbStatus = mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado';
    
    // Informações básicas do sistema
    const systemInfo = {
      uptime: process.uptime(),
      timestamp: Date.now(),
      hostname: os.hostname(),
      platform: process.platform,
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        usage: process.memoryUsage()
      },
      cpu: os.cpus(),
      load: os.loadavg()
    };

    // Contagem de rotas registradas
    const routeCount = router.stack ? router.stack.length : 'não disponível';

    // Enviar resposta
    res.status(200).json({
      status: 'ok',
      message: 'Serviço funcionando normalmente',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || 'desconhecida',
      database: {
        status: dbStatus,
        name: mongoose.connection.name || 'não disponível'
      },
      environment: process.env.NODE_ENV || 'development',
      system: systemInfo,
      routes: {
        count: routeCount
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao verificar status do serviço',
      error: error.message
    });
  }
});

// Rota simplificada - usado pelo Render para health check
router.get('/ping', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'pong',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 