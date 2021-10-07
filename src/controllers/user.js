const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signIn = async (req, res) => {
    try {
        const { name, address } = req.body;
        const token = generateJwtToken(name, address);
        const _user = new User({
            name, address
        });

        await _user.save((err, user) => {
            if (user) {
                res.status(200).json({ token: token });
            }
            else {
                res.status(400).json({ message: err.message })
            }
        })
    } catch (error) {
        handleError(error);
    }
}

