const app = require('../app');
const request = require('supertest');
const category = require('../models/Category')
const Image = require('../models/Image')
require('../models')


let token;
let id;

beforeAll(async () => {
    const body = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
})
test('GET/products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST/products', async () => {
    const body = {
        title: 'Televisor de 40 pulgadas',
        description: 'Televisor',
        categoryId: category.id,
        brand: 'TLC',
        price: '1000'
    }
    const res = await request(app)
        .post('/products')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    await res.destroy();
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
    expect(res.body.headline).toBe(body.headline);
});
test("PUT/products/:id debe actualizar una product", async () => {
    const body = {
        brand: 'Samsung'
    }
    const res = await request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.brand).toBe(body.brand);
});
test('POST/products/:id/images', async () => {
    const image = await Image.create({ url: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png', publicId: 'id' })
    const res = await request(app)
        .post(`/products/${id}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`)
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})
test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
