const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Contact = require('../../models/contact');
const { defaultContacts } = require('./contacts');

const userOneId = new mongoose.Types.ObjectId();

let userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@mike.com',
    password: 'mikePass777',
    authToken: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
};

userOne.token = jwt.sign({ email: userOne.email.toString() }, process.env.JWT_SECRET);

const userTwoId = new mongoose.Types.ObjectId();

let userTwo = {
    _id: userTwoId,
    name: 'Mike 2',
    email: 'mike2@mike.com',
    password: 'mikePass777',
    authToken: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
};

userTwo.token = jwt.sign({ email: userTwo.email.toString() }, process.env.JWT_SECRET);

const setupDatabase = async () => {
    await User.deleteMany();
    await Contact.deleteMany();

    await new User(userOne).save();
    await new User(userTwo).save();

    // defaultContacts.forEach(contact => {
    //
    // });
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase
};
