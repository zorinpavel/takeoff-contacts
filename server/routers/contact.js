const express = require('express');
const Contact = require('../models/contact');
const auth = require('../middleware/auth');
const getDefaultContacts = require('../utils/contacts');


const router = new express.Router();

router.options('/contacts*', (req, res) => {
    res.status(200);
});

router.post('/contacts', auth, async (req, res) => {
    const contact = new Contact({
        ...req.body,
        owner: req.user._id
    });

    try {
        await contact.save();
        res.status(201).send(contact);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/contacts/random', auth, async (req, res) => {
    try {
        await getDefaultContacts({ limit: 1 })
            .then(body => JSON.parse(body))
            .then(async (contacts) => {
                const contactsObjects = await Promise.all(contacts.map(contact => {
                    contact.owner = req.user;
                    return new Contact(contact).save();
                }));

                res.status(201).send(contactsObjects);
            })
            .catch(e => {
                console.error(e);
                throw new Error(e);
            });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/contacts', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.name)
        match.firstName = { $regex: req.query.name, $options: 'i' };

    if (req.query.sort) {
        const parts = req.query.sort.split(':');

        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    let skip = 0;

    if (req.query.page)
        skip = req.query.page * req.query.limit;

    try {
        await req.user.populate({
            path: 'contacts',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate();

        res.send(req.user.contacts);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const contact = await Contact.findOne({ _id, owner: req.user._id });

        if (!contact)
            return res.status(404).send();

        res.send(contact);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        const contact = await Contact.findOne({ _id, owner: req.user._id });

        if (!contact)
            return res.status(404).send();

        updates.forEach((update) => contact[update] = req.body[update]);
        await contact.save();

        res.send(contact);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const contact = await Contact.findOneAndDelete({ _id, owner: req.user._id });

        if (!contact)
            return res.status(404).send();

        res.send(contact);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
