const mongoose = require('mongoose');
const phone = require('phone');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            const phoneNumber = phone(value);

            if (!phoneNumber[0])
                throw new Error('Phone number is not valid');
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

contactSchema.pre('save', async function(next) {
    // do anything before

    return next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
