const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema(
{    itemId:{
        type: String,
    },
    itemName:{
        type: String,
    },
    itemPicture:{
        type: String,
    },
    description:{
        type: String,
    },
    royalties:{
        type: String,
    },
    size:{
        type: String,
    },
    propertie:{
        type: String,
    },
    onSale:{
        type: Boolean,
        default: false
    },
    instantSalePrice:{
        type: Number,
    },
    unlockOncePurchased:{
        type: Boolean,
        default: false
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    note:{
        type: String,
    },
    contractAddress:{
        type: String,
    },
    tokenId:{
        type: String,
    },
    tokenStandard:{
        type: String,
    },
    blockChain:{
        type: String,
    },
    metaData:{
        type: String,
    },
});


module.exports = mongoose.model('Item',ItemSchema);