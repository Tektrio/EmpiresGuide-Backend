/**
 * Rota de health check para verificar o status do servidor
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Rota básica de health check
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Servidor funcionando corretamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Rota detalhada de health check com status do banco de dados
router.get('/detailed', async (req, res) => {
  try {
    // Verificar conexão com o banco de dados
    const dbStatus = mongoose.connection.readyState === 1 
      ? 'connected' 
      : 'disconnected';
    
    // Verificar uso de memória
    const memoryUsage = process.memoryUsage();
    
    // Verificar tempo de atividade
    const uptime = process.uptime();
    
    res.status(200).json({
      status: 'OK',
      message: 'Health check detalhado',
      server: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        uptime: uptime.toFixed(2) + 's',
        nodeVersion: process.version
      },
      database: {
        status: dbStatus,
        name: mongoose.connection.name || 'N/A'
      },
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024) + 'MB',
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB'
      }
    });
  } catch (error) {
    console.error('Erro no health check detalhado:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erro ao realizar health check detalhado',
      error: process.env.NODE_ENV === 'production' ? {} : error
    });
  }
});

module.exports = router; 