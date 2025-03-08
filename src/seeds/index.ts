import mongoose from 'mongoose';
import { config } from 'dotenv';
import { connectDB } from '../config/db';
import { seedEnglish } from './englishSeed';
import { seedChinese } from './chineseSeed';
import { seedMongol } from './mongolSeed';
import { seedFrench } from './frenchSeed';
import { seedRus } from './rusSeed';
import { seedAbbasid } from './abbasidSeed';
import { seedAyyubids } from './ayyubidsSeed';
import { seedZhuXiLegacy } from './zhuXiLegacySeed';
import { seedOrderOfDragon } from './orderOfDragonSeed';
import { seedJapanese } from './japaneseSeed';
import { seedOttoman } from './ottomanSeed';
import { seedByzantine } from './byzantineSeed';
import { seedJeanneDarc } from './jeanneDarcSeed';
import { seedMalian } from './malianSeed';
import { seedDelhi } from './delhiSeed';
import { seedHreEmpire } from './hreEmpireSeed';
import { seedMatchups } from './matchupSeeds';
import { saveAllMatchups } from './matchupGenerator';

config();

async function seed() {
  try {
    console.log('🌱 Iniciando processo de seed...');
    
    // Conectar ao banco de dados
    await connectDB();
    
    // Inserir dados das civilizações
    await seedEnglish();
    await seedChinese();
    await seedMongol();
    await seedFrench();
    await seedRus();
    await seedAbbasid();
    await seedAyyubids();
    await seedZhuXiLegacy();
    await seedOrderOfDragon();
    await seedJapanese();
    await seedOttoman();
    await seedByzantine();
    await seedJeanneDarc();
    await seedMalian();
    await seedDelhi();
    await seedHreEmpire();
    
    // Opções de seed
    const useCompleteMatchups = process.env.USE_COMPLETE_MATCHUPS === 'true';
    
    if (useCompleteMatchups) {
      // Usar o gerador completo de matchups (324 combinações)
      await saveAllMatchups();
    } else {
      // Usar apenas os matchups detalhados existentes
      await seedMatchups();
    }
    
    console.log('✅ Processo de seed concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o processo de seed:', error);
  } finally {
    // Fechar conexão com o banco de dados
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}

seed(); 