const User = require('../models/user');
const Item = require('../models/item');


exports.createSingleItem = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        if (user) {
            const { itemName, description, royalties, size, propertie,
                onSale, instantSalePrice, unlockOncePurchased, collection } = req.body
            const itemPicture = req.file.filename;
            const _item = new Item({
                itemName,
                itemPicture: itemPicture,
                description,
                royalties,
                size,
                propertie,
                onSale,
                instantSalePrice,
                unlockOncePurchased,
                collection
            });
            await _item.save(async (error, item) => {
                if (error) {
                    res.status(400).json({ message: error.message });
                } else {
                    if (item.onSale) {
                        User.findOneAndUpdate({ _id: user._id }, {
                            "$push": {
                                "onSale": item._id,
                                "created": item._id
                            }
                        }).then(() => { res.status(200).json('Item created and added onSale') })
                            .catch(err => {
                                res.status(400).json(err)
                            });
                    } else {
                        User.findOneAndUpdate({ _id: user._id }, {
                            "$push": {
                                "created": item._id
                            }
                        }).then(() => { res.status(200).json('Item created') })
                            .catch(err => {
                                res.status(400).json(err)
                            });
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}