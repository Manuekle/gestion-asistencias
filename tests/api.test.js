import request from 'supertest';
import app from '../server/app.js'; // Asegúrate de que la ruta al archivo principal de tu aplicación sea correcta

describe('API Tests', () => {
  it('should get usuarios', async () => {
    const res = await request(app).get('/api/usuario');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('usuarios');
  });

  it('should get docentes', async () => {
    const res = await request(app).get('/api/docente');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('docentes');
  });

  it('should get estudiantes', async () => {
    const res = await request(app).get('/api/estudiante');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('estudiantes');
  });

  it('should get asignaturas', async () => {
    const res = await request(app).get('/api/asignatura');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('asignaturas');
  });

  it('should get clases', async () => {
    const res = await request(app).get('/api/clase');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('clases');
  });

  it('should get codigos QR', async () => {
    const res = await request(app).get('/api/qr');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('codigosQr');
  });

  it('should get asistencias', async () => {
    const res = await request(app).get('/api/asistencia');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('asistencias');
  });

  it('should get reportes', async () => {
    const res = await request(app).get('/api/reporte');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('reportes');
  });
});
