const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Pasha',
        email: 'zorin.pavel@gmail.com',
        password: 'MyPass777'
    }).expect(201);

    const user = await User.findById(response.body.user._id);

    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: 'Pasha',
            email: 'zorin.pavel@gmail.com',
        },
        token: user.token
    });
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);

    expect(response.body.token).toBe(user.token);
});

test('Should NOT login user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'anyemail@email.com',
            password: 'password'
        })
        .expect(400);
});

test('Should get profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.token)
        .send()
        .expect(200);
});

test('Should NOT get profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + userOne.token)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);

    expect(user).toBeNull();
});

test('Should NOT delete profile', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should update profile', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.token)
        .send({
            name: 'New name',
        })
        .expect(200);

    const user = await User.findById(userOneId);

    expect(user.name).toBe('New name');
});

test('Should NOT update password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.token)
        .send({
            password: 'pass',
        })
        .expect(400);
});
