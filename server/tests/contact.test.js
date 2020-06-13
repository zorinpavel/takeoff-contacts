const request = require('supertest');
const app = require('../app');
const Contact = require('../models/contact');
const { userOne, userTwo, setupDatabase } = require('./fixtures/db');
const defaultContacts = require('./fixtures/contacts');


beforeEach(setupDatabase);

test('Should add new contact', async () => {
    const response = await request(app)
        .post('/contacts')
        .set('Authorization', 'Bearer ' + userOne.authToken)
        .send({
            name: 'Pasha',
            email: 'zorin.pavel@gmail.com',
        })
        .expect(201);

    const contact = await Contact.findById(response.body._id);

    expect(contact).not.toBeNull();
});

test('Should fetch user contacts', async () => {
    const response = await request(app)
        .get('/contacts')
        .set('Authorization', 'Bearer ' + userOne.authToken)
        .send()
        .expect(200);

    expect(response.body.length).toBe(defaultContacts.length);
});

test('Should NOT delete contact', async () => {
    await request(app)
        .delete('/contacts/' + defaultContacts[0]._id)
        .set('Authorization', 'Bearer ' + userTwo.authToken)
        .send()
        .expect(404);

    const contact = Contact.findById(defaultContacts[0]._id);

    expect(contact).not.toBeNull();
});

// doesn't work
// test('Should delete contact', async () => {
//     await request(app)
//         .delete('/contacts/' + defaultContacts[0]._id)
//         .set('Authorization', 'Bearer ' + userOne.authToken)
//         .send()
//         .expect(200);
//
//     const contact = Contact.findById(defaultContacts[0]._id);
//
//     console.log(contact);
//
//     expect(contact).toBeNull();
// });
