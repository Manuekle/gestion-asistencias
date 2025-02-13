import request from 'supertest';
import app from '../server/index';

// Test for getting all users
describe('GET /api/usuario/show', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/api/usuario/show');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
  });
});

// Test for getting a single user by ID
describe('GET /api/usuario/show/:id', () => {
  it('should return a single user', async () => {
    const res = await request(app).get('/api/usuario/show/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });
});

// Test for creating a new user
describe('POST /api/usuario/register', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/usuario/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        email: 'testuser@example.com'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });
});

// Test for user login
describe('POST /api/usuario/login', () => {
  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/usuario/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

// Test for password recovery
describe('POST /api/usuario/recover', () => {
  it('should recover password', async () => {
    const res = await request(app)
      .post('/api/usuario/recover')
      .send({
        email: 'testuser@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

