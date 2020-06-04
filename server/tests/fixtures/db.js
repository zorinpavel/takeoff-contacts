const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Contact = require('../../models/contact');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@mike.com',
    password: 'mikePass777',
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Mike 2',
    email: 'mike2@mike.com',
    password: 'mikePass777',
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
};

const contactOneId = new mongoose.Types.ObjectId();
const contactOne = {
    _id: contactOneId,
    firstName: 'Forest',
    lastName: 'Gump',
    phoneNumber: '+79023097288',
    owner: userOne._id
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Contact.deleteMany();

    await new User(userOne).save();
    await new User(userTwo).save();

    await new Contact(contactOne).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    contactOneId,
    contactOne,
    setupDatabase
};
