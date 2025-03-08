/**
 * Configuração CORS para o backend
 */

const corsOptions = {
  // Origens permitidas (em produção, substitua por seus domínios frontend)
  origin: [
    'http://localhost:3000',             // Para desenvolvimento local
    'https://empiresguide.vercel.app',   // Para produção no Vercel
    'https://empiresguide.com',          // Para domínio personalizado (se existir)
    /\.vercel\.app$/                     // Permite qualquer subdomínio no vercel.app
  ],
  
  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  
  // Headers permitidos
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Accept', 
    'Origin'
  ],
  
  // Expor estes headers para o cliente
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  
  // Permitir credenciais (cookies, autenticação)
  credentials: true,
  
  // Tempo de cache do pre-flight (em segundos)
  maxAge: 86400,
  
  // Função para personalizar a resposta CORS
  preflightContinue: false,
};

module.exports = corsOptions; 