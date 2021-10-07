const User = require('../models/user');
const Item = require('../models/item');


exports.createSingleItem = async (req, res) => {
    try {
        const user = await User.findOne({address: req.user.address});
    if(user){
        const { itemName, itemPicture, description, royalties, size, propertie, 
            onSale, instantSalePrice, unlockOncePurchased, collection } = req.body
        
        const _item = new Item({
            itemName, itemPicture, description, royalties, size, propertie, 
            onSale, instantSalePrice, unlockOncePurchased, collection
        });

        _item.save((error,item)=>{
            if(error){
                res.status(400).json({message: error.message});
            }else{
                res.status(200).json({item: item});
            }
        });
    }
    } catch (error) {
        handleError(error);
    }
}