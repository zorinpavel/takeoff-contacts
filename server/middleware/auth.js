const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, token: authToken });

        if (!user)
            throw new Error('Can\'t find user');

        req.token = authToken;
        req.user = user;

        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate', e });
    }
};

module.exports = auth;
