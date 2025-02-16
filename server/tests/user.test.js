// tests/user.test.js
import { testServer } from '../utils/test.server.js';
import { getUsuarios } from '../controllers/usuarios.controller.js';

describe('GET /api/usuario/show', () => {
  it('should return a list of users with status 200', async () => {
    const request = testServer(getUsuarios);
    const response = await request.get('/api/usuario/show');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'John Doe' }]);
  });
});
