const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    address:{
        type: String,
        required: true,
        unique: true
    },
    about:{
        type: String,
    },
    websiteLink:{
        type: String,
    },
    profilePicture:{
        type: String,
    },
    coverPicture:{
        type: String
    },
    onSale:[{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    collectibles:[{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    created:[{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    following:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('User',userSchema);