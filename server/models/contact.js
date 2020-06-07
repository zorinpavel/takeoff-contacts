const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: false,
    },
    position: {
        type: String,
        trim: true,
    },
    photo: {
        type: String,
        trim: true,
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
