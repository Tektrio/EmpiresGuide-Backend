import axios from 'axios';

// Função para testar a rota comprehensive
const testComprehensiveStrategy = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/guides/comprehensive', {
      playerCiv: 'Tártaros',
      enemyCivs: ['Bizantinos', 'Chineses'],
      mapType: 'Ilhas em Guerra',
      mapSize: 'Grande',
      gameMode: 'Padrão',
      victoryConditions: {
        landmarks: true,
        sacred: false,
        wonder: false,
        conquest: true
      },
      resources: 'Padrão',
      startingAge: 'Era I',
      modPack: 'Padrão'
    });

    console.log('✅ Resposta recebida com sucesso!');
    console.log(`Status: ${response.status}`);
    console.log('Dados da resposta:', JSON.stringify(response.data, null, 2).substring(0, 500) + '...');
    return true;
  } catch (error) {
    console.error('❌ Erro ao testar a rota comprehensive:', error);
    return false;
  }
};

// Função principal para executar os testes
const runTests = async () => {
  console.log('🚀 Iniciando testes da API...');
  
  // Testar a rota comprehensive
  console.log('\n📝 Testando rota /api/guides/comprehensive...');
  const comprehensiveResult = await testComprehensiveStrategy();
  
  // Resumo dos resultados
  console.log('\n📊 Resumo dos testes:');
  console.log(`- Rota /api/guides/comprehensive: ${comprehensiveResult ? '✅ Sucesso' : '❌ Falha'}`);
};

// Executar os testes
runTests(); 