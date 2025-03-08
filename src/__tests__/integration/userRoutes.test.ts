import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import User from '../../models/User';
import connectDB from '../../config/db';

describe('User Routes', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados de teste
    process.env.MONGO_URI = 'mongodb://localhost:27017/test-db';
    await connectDB();
  });

  afterAll(async () => {
    // Limpar banco de dados e fechar conexão
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpar coleção de usuários antes de cada teste
    await User.deleteMany({});
  });

  describe('POST /api/users/register', () => {
    test('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('name', 'Test User');

      // Verificar se o usuário realmente foi criado no banco
      const user = await User.findOne({ email: 'test@example.com' });
      expect(user).toBeTruthy();
    });

    test('should not register user with existing email', async () => {
      // Criar um usuário primeiro
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123',
      });

      // Tentar registrar com o mesmo e-mail
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'Another User',
          email: 'existing@example.com',
          password: 'newpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/users/login', () => {
    test('should login with valid credentials', async () => {
      // Criar usuário para teste
      await User.create({
        name: 'Login Test',
        email: 'login@example.com',
        password: 'password123',
      });

      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('email', 'login@example.com');
    });

    test('should not login with invalid password', async () => {
      // Criar usuário para teste
      await User.create({
        name: 'Invalid Login',
        email: 'invalid@example.com',
        password: 'password123',
      });

      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'invalid@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });

    test('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
    });
  });
});