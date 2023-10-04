const app = require('../app');
const request = require('supertest');

let token;

beforeAll(async () => {
    const body = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
})

test('GET/images', async () => {
    const res = await request(app)
        .get('/images');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
