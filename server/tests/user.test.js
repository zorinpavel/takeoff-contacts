const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should sign up new user', async() => {
    const testUser = {
        name: 'Test user',
        email: 'test_user@user.test',
        password: 'anyTestPassword'
    };
    const response = await request(app)
        .post('/users')
        .send(testUser)
        .expect(201);

    const user = await User.findById(response.body.user._id);

    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: user.name,
            email: user.email,
        },
        authToken: user.authToken
    });
});

test('Should login existing user', async() => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            token: userOne.token
        })
        .expect(200);

    const user = await User.findById(response.body.user._id);

    expect(response.body.authToken).toBe(user.authToken);
});

test('Should NOT login user', async() => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'anyemail@email.com',
            token: 'any_not_valid_token'
        })
        .expect(400);
});

test('Should get profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.authToken)
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
        .set('Authorization', 'Bearer ' + userOne.authToken)
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
        .set('Authorization', 'Bearer ' + userOne.authToken)
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
        .set('Authorization', 'Bearer ' + userOne.authToken)
        .send({
            password: 'pass',
        })
        .expect(400);
});
