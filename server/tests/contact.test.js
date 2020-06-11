const request = require('supertest');
const app = require('../app');
const Contact = require('../models/contact');
const { userOne, userTwo, setupDatabase } = require('./fixtures/db');


beforeEach(setupDatabase);

test('Should add new contact', async () => {
//     const response = await request(app)
//         .post('/contacts')
//         .set('Authorization', 'Bearer ' + userOne.token)
//         .send({
//             firstName: 'Pasha',
//             lastName: 'Zorin',
//             email: 'zorin.pavel@gmail.com',
//         })
//         .expect(201);
//
//     const contact = await Contact.findById(response.body._id);
//
//     expect(contact).not.toBeNull();
});
//
// test('Should fetch user contacts', async () => {
//     const response = await request(app)
//         .get('/contacts')
//         .set('Authorization', 'Bearer ' + userOne.token)
//         .send()
//         .expect(200);
//
//     expect(response.body.length).toBe(1);
// });
//
// test('Should NOT delete contact', async () => {
//     await request(app)
//         .delete('/contacts/' + contactOneId)
//         .set('Authorization', 'Bearer ' + userTwo.token)
//         .send()
//         .expect(404);
//
//     const contact = Contact.findById(contactOneId);
//
//     expect(contact).not.toBeNull();
// });
