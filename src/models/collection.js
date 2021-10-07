const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    collectionName:{type: String},
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});

exports.module = mongoose.model('Collection',collectionSchema);