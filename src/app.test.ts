import request from 'supertest';
import app from './app';

describe('app', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /api/health-check returns OK', async () => {
    const res = await request(app).get('/api/health-check');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('API not found');
  });

  it('rejects malformed JSON with 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send('{bad');
    expect(res.status).toBe(400);
  });
});

describe('validation', () => {
  it('rejects an invalid user payload', async () => {
    const res = await request(app).post('/api/users').send({ username: 'a', mobileNumber: '123' });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/mobileNumber/);
  });

  it('rejects a non-hex user id', async () => {
    const res = await request(app).get('/api/users/not-an-id');
    expect(res.status).toBe(400);
  });
});

describe('auth', () => {
  it('rejects bad credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ username: 'x', password: 'y' });
    expect(res.status).toBe(401);
  });

  it('protects /api/auth/random-number', async () => {
    const res = await request(app).get('/api/auth/random-number');
    expect(res.status).toBe(401);
  });

  it('issues a token that unlocks protected routes', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ username: 'tester', password: 'tester-password' });
    expect(login.status).toBe(200);

    const res = await request(app)
      .get('/api/auth/random-number')
      .set('Authorization', `Bearer ${login.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('tester');
    expect(typeof res.body.num).toBe('number');
  });
});
