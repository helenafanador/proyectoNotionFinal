const request = require('supertest');
const app = require('../app');

let id;
let token;

test("POST/debe crear un user", async () => {
    const body = {
        firstName: "Isabel",
        lastName: "Carvajal",
        email: "helen_afanador@hotmail.com",
        password: "12345",
        phone: "1165589473",
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.password).toBeFalsy();
});
test('POST/users/login', async () => {
    const body = {
        email: "helenafanador90@gmail.com",
        password: "helen12345",
    }
    const res = await request(app)
        .post('/users/login')
        .send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
});

test("GET/users debe retornar status 200", async () => {
    const res = await request(app).get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("PUT/users/:id debe actualizar un user", async () => {
    const body = {
        firstName: "Isabel"
    }
    const res = await request(app).put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

// test('POST/users/login con credenciales invalidas debe retornar error', async () => {
//     const body = {
//         email: "error@gmail.com",
//         password: "error1234",
//     }
//     const res = await request(app)
//         .post('/users/login')
//         .send(body);
//     expect(res.status).toBe(204);
// });
test("DELETE/users/:id debe eliminar un user", async () => {

    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
