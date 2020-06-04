const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.options('/users*', (req, res) => {
    res.status(200);
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const authToken = await user.generateAuthToken();

        await user.save();

        res.status(201).send({ user, authToken });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});

        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if (!user)
            return res.status(404).send();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['_id', 'name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    const _id = req.body._id;
    const user = _id ? await User.findById({ _id }) : req.user;

    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates' });

    try {
        updates.forEach((update) => {
            if (update !== '_id')
                user[update] = req.body[update];
        });
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send({ user: req.user, e });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.token);
        const authToken = await user.generateAuthToken();

        res.send({ user, authToken });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.token = '';
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
