/**
 * Utilitário para verificar a configuração do banco de dados
 */

export const checkDatabaseConfig = () => {
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
  return false;
};

export default checkDatabaseConfig; 