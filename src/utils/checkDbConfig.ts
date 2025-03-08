/**
 * Utilitário para verificar a configuração do banco de dados
 */

export const checkDatabaseConfig = () => {
  // Verificar modo de tolerância de conexão
  const isToleranceMode = process.env.MONGODB_TOLERANCE_MODE === 'true';
  const allowMockInProduction = process.env.ALLOW_MOCK_DB_IN_PRODUCTION === 'true';
  
  // Se estamos em modo de tolerância, considera configuração válida mesmo sem variáveis
  if (isToleranceMode) {
    console.log('✅ Modo de tolerância MongoDB ativado - Continuará mesmo sem conexão');
    
    if (process.env.NODE_ENV === 'production' && allowMockInProduction) {
      console.log('⚠️ Banco em memória permitido em produção - Funcionalidade pode ser limitada');
    }
    
    return true;
  }
  
  // Verificar variáveis de ambiente no formato Tek Trio
  if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
    console.log('✅ Configuração de banco de dados no formato Tek Trio está presente');
    return true;
  }
  
  // Verificar variável de ambiente no formato URI direto
  if (process.env.MONGODB_URI) {
    console.log('✅ Configuração de banco de dados no formato URI direto está presente');
    return true;
  }
  
  // Nenhuma configuração encontrada
  console.error('❌ Nenhuma configuração de banco de dados encontrada');
  console.log('⚠️ Defina DATABASE e DATABASE_PASSWORD ou MONGODB_URI nas variáveis de ambiente');
  
  // Em produção, isso é crítico a menos que o modo de tolerância esteja ativado
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Em ambiente de produção, configuração de banco de dados é obrigatória!');
    return false;
  }
  
  // Em desenvolvimento, podemos continuar mesmo sem configuração
  console.log('⚠️ Continuando em modo de desenvolvimento sem configuração de banco de dados');
  return false;
};

export default checkDatabaseConfig; 