const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    name: {
        type: String,
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

module.exports = mongoose.model('Collection', collectionSchema);