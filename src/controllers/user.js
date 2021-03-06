const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getJWtToken = (_id, address) => {
    return jwt.sign({ _id, address }, process.env.JWT_KEY);
}

exports.signIn = async (req, res) => {
    const { address } = req.body;
    
    const _user = new User({
        address
    });

    const user = await User.findOne({ address: address });
    if (user) {
        const token = getJWtToken(user._id, user.address);
        res.status(200).json({ token: token });
    } else {
        _user.save(async(error, user) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                const token = await getJWtToken(user._id, user.address);
                res.status(200).json({ token: token });
            }
        });
    }
}

exports.getMyProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate('created onSale collectibles likes following followers')
        .select('-__v');
    if (user) {
        res.status(200).json({ profile: user });
    } else {
        res.status(400).json({ message: "User Not Found" });
    }
}

exports.follow = (req, res) => {
    User.findByIdAndUpdate(req.params.followId, {
        $push: { followers: req.user._id }
    }, { new: true }, (err) => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
            User.findByIdAndUpdate(req.user._id, {
                $push: { following: req.params.followId }
            }, { new: true }).then(result => res.status(200).json(result))
                .catch(error => { res.status(400).json({ error: error }) });
        }
    })
}

exports.profile = async (req, res) => {
    await User.findById(req.params.id)
        .select('-__v')
        .then(user => {
            res.status(200).json({ profile: user });
        })
        .catch(error => { res.status(400).json({ message: error.message }) })
}