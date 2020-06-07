const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Contact = require('./contact');
const getDefaultContacts = require('../utils/contacts');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: false,
        trim: true,
        // minlength: 7,
        validate(value) {
            if (!validator.isLength(value, { min: 6 }))
                throw new Error('Password should be more then 6');
            if (validator.contains(value, 'password'))
                throw new Error('Password can not be that');
        }
    },
    authToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.virtual('contacts', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.statics.findByCredentials = async (email, token) => {
    const user = await User.findOne({ email });

    if (!user)
        throw new Error('Unable to login');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isMatch = (decoded.email === user.email);

    if (!isMatch)
        throw new Error('Wrong token');

    return user;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.authToken = token;
    await user.save();

    return token;
};

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.authToken;

    return userObject;
};

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8);

    if (this.isNew) {
        await getDefaultContacts()
            .then(body => JSON.parse(body))
            .then(contacts => {
                contacts.forEach(async (contact) => {
                    const contactObj = new Contact(contact);

                    contactObj.owner = user;
                    await contactObj.save();
                });
            })
            .catch(e => {
                console.error(e);
                throw new Error(e);
            });
    }

    next();
});

userSchema.pre('remove', async function(next) {
    const user = this;

    await Contact.deleteMany({ owner: user._id });

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
