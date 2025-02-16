import express from 'express';
import supertest from 'supertest';

export function testServer(route) {
  const app = express();
  app.use(express.json()); // Permitir datos JSON
  route(app);
  return supertest(app); // Devuelve un objeto Supertest para enviar peticiones
}
