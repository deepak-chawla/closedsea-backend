const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getJWtToken = (_id, name)=>{
    return jwt.sign({_id, name}, process.env.JWT_KEY);
}

exports.signIn = async (req, res) => {
    try {
        const { name, address } = req.body;
        const _user = new User({
            name, address
        });

        const user = await User.findOne({address: req.body.address});
        if(user){
            const token = getJWtToken(user._id, name);
            console.log("user exist")
            res.status(200).json({ token: token });
        }
        else{
        await _user.save((err, user) => {
            if (user) {
                const token = getJWtToken(user._id, name);
                res.status(200).json({ token: token });
            }
            else {
                res.status(400).json({ message: err.message })
            }
        })}
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.editUser = async (req, res)=>{
    const user = await User.findById(req.params.id);

}