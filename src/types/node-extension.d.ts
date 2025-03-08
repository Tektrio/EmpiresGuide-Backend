declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    DATABASE?: string;
    DATABASE_PASSWORD?: string;
    MONGODB_URI?: string;
    JWT_SECRET: string;
    USE_COMPLETE_MATCHUPS: string;
  }
} 