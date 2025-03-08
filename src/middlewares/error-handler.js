/**
 * Middleware para tratamento centralizado de erros
 */

const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado pelo middleware:', err);
  
  // Determinar o status do erro
  const statusCode = err.statusCode || 500;
  
  // Mensagem de erro (mais detalhada em ambiente de desenvolvimento)
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Erro interno do servidor' 
    : err.message || 'Erro interno do servidor';
  
  // Detalhes do erro (apenas em desenvolvimento)
  const errorDetails = process.env.NODE_ENV === 'production' 
    ? {} 
    : {
        stack: err.stack,
        details: err.details || err.errors || null
      };
  
  // Enviar resposta de erro
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
    ...errorDetails,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
};

module.exports = errorHandler; 