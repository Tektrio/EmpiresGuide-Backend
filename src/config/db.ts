import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Mock das funcionalidades do MongoDB para desenvolvimento sem MongoDB instalado
const setupMemoryMockDB = () => {
  const collections: Record<string, any[]> = {
    civilizations: [
      {
        _id: 'civ1',
        name: 'Tártaros',
        strengths: [
          'Mobilidade excepcional com unidades montadas',
          'Forte economia baseada em ovelhas e comércio',
          'Arqueiros montados letais',
          'Capacidade de construir estruturas militares rapidamente'
        ],
        weaknesses: [
          'Dependência de unidades caras',
          'Vulnerabilidade a unidades anti-cavalaria',
          'Base inicial mais frágil',
          'Necessidade de microgerenciamento intenso'
        ],
        eraStrategies: {
          eraI: {
            buildOrder: ['Treinar aldeões', 'Coletar recursos', 'Explorar o mapa'],
            keyUnits: ['Aldeões', 'Exploradores'],
            keyTechnologies: ['Coleta melhorada']
          },
          eraII: {
            buildOrder: ['Construir barracas', 'Treinar unidades militares', 'Expandir economia'],
            keyUnits: ['Arqueiros Montados', 'Lanceiros'],
            keyTechnologies: ['Metalurgia']
          }
        }
      },
      {
        _id: 'civ2',
        name: 'Hausa',
        strengths: [
          'Economia forte baseada em mineração',
          'Unidades únicas poderosas',
          'Bônus de pesquisa e tecnologia',
          'Excelente na guerra de cerco'
        ],
        weaknesses: [
          'Início de jogo mais lento',
          'Unidades caras e especializadas',
          'Dependência de recursos específicos',
          'Vulnerabilidade a ataques rápidos'
        ],
        eraStrategies: {
          eraI: {
            buildOrder: ['Focar em mineração', 'Construir muralhas', 'Treinar defensores'],
            keyUnits: ['Aldeões', 'Arqueiros'],
            keyTechnologies: ['Mineração avançada']
          },
          eraII: {
            buildOrder: ['Construir academia militar', 'Treinar unidades de elite', 'Expandir território'],
            keyUnits: ['Guerreiros Hausa', 'Arqueiros de Elite'],
            keyTechnologies: ['Metalurgia Avançada']
          }
        }
      }
    ],
    landmarks: [
      {
        _id: 'landmark1',
        name: 'Posto Comercial Tártaro',
        civilization: 'Tártaros',
        era: 'Era II',
        effect: 'Gera ouro passivamente e aumenta a eficiência do comércio'
      },
      {
        _id: 'landmark2',
        name: 'Centro de Mineração',
        civilization: 'Hausa',
        era: 'Era II',
        effect: 'Aumenta a eficiência da mineração de ouro e pedra'
      }
    ],
    mapstrategies: [
      {
        _id: 'map1',
        name: 'Ilhas em Guerra',
        type: 'Naval',
        generalStrategy: 'Foque no controle naval e expanda para outras ilhas quando possível.',
        resourceControl: 'Garanta o controle de recursos marítimos e pontos de pesca.',
        expansionPriorities: 'Expanda para ilhas menores para obter recursos adicionais.',
        recommendedStrategies: {
          early: ['Construa docas', 'Treine barcos de pesca', 'Explore o mapa'],
          mid: ['Controle as águas', 'Expanda para ilhas', 'Fortifique bases'],
          late: ['Domine as rotas marítimas', 'Ataque com frotas grandes', 'Controle recursos']
        }
      }
    ],
    civilizationmatchups: [
      {
        _id: 'matchup1',
        playerCiv: 'Tártaros',
        enemyCiv: 'Hausa',
        earlyGameStrategy: 'Faça raides com arqueiros montados para atrasar a economia baseada em mineração.',
        midGameStrategy: 'Evite confrontos diretos, mantenha a pressão com mobilidade superior.',
        lateGameStrategy: 'Use sua cavalaria para atacar posições desprotegidas e evite confrontos diretos.',
        unitsToFocus: ['Arqueiros Montados', 'Cavalaria Pesada', 'Lanceiros'],
        unitsToAvoid: ['Guerreiros Hausa', 'Arqueiros de Elite Hausa']
      }
    ],
    users: []
  };

  // Mock de funções para simular mongoose
  const mockMongoose = {
    model: (modelName: string) => {
      const collectionName = modelName.toLowerCase() + 's';
      return {
        find: (query = {}) => {
          return {
            exec: () => Promise.resolve(collections[collectionName] || [])
          };
        },
        findOne: (query = {}) => {
          const collection = collections[collectionName] || [];
          return {
            exec: () => Promise.resolve(collection[0] || null)
          };
        },
        findById: (id: string) => {
          const collection = collections[collectionName] || [];
          const item = collection.find(item => item._id === id);
          return {
            exec: () => Promise.resolve(item || null)
          };
        },
        create: (data: any) => {
          const collection = collections[collectionName] || [];
          const newItem = { _id: `id_${Date.now()}`, ...data };
          collection.push(newItem);
          return Promise.resolve(newItem);
        }
      };
    },
    connect: () => Promise.resolve({
      connection: {
        host: 'memory-mock-db'
      }
    })
  };

  // Substituir o mongoose pelo mock
  (global as any).mockMongooseEnabled = true;
  return mockMongoose;
};

const connectDB = async () => {
  try {
    // Verificar qual variável de ambiente está disponível
    let connectionString: string;
    
    if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
      // Formato usado no repositório Tek Trio 2025
      connectionString = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
      console.log('✅ Usando configuração oficial do banco de dados MongoDB Atlas');
    } else if (process.env.MONGODB_URI) {
      // Formato alternativo direto
      connectionString = process.env.MONGODB_URI;
      console.log('✅ Usando configuração de banco de dados do formato URI direto');
    } else {
      console.warn('⚠️ Nenhuma variável de ambiente de conexão com banco de dados definida!');
      throw new Error('Variáveis de ambiente de banco de dados não definidas');
    }
    
    // Tenta conectar ao MongoDB Atlas
    const conn = await mongoose.connect(connectionString);
    console.log(`✅ MongoDB Atlas Conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Erro ao conectar ao MongoDB Atlas: ${error instanceof Error ? error.message : String(error)}`);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Falha crítica em ambiente de produção. O servidor será encerrado.');
      process.exit(1);
    }
    
    console.log('⚠️ Usando banco de dados em memória para desenvolvimento...');
    
    // Configurar banco de dados em memória como fallback
    const mockDB = setupMemoryMockDB();
    const conn = await mockDB.connect();
    console.log(`✅ Conectado ao banco de dados em memória: ${conn.connection.host}`);
    return conn;
  }
};

export default connectDB; 