const User = require('../models/user');
const Item = require('../models/item');

exports.createSingleItem = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        if (user) {
            const { itemName, description, royalties, size, propertie,
                onSale, instantSalePrice, unlockOncePurchased, collection } = req.body

            //const itemPicture = req.file.filename;
            const itemId = Math.floor(1000 + Math.random() * 6000);

            const _item = new Item({
                itemId: itemId,
                itemName,
                //itemPicture: itemPicture,
                description,
                royalties,
                size,
                propertie,
                onSale,
                creator: user._id,
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

exports.getItem = async (req, res)=>{
    await Item.findById(req.params.id)
    .then(item => res.status(200).json({item: item}))
    .catch(error => res.status(400).json({error: error}))
}


exports.getAllItems = async (req, res) => {
    await Item.find()
        .then(items => res.status(200).json({ items: items }))
        .catch(error => res.status(200).json({ error: error }));
}


exports.deleteItemById = async (req, res) => {
    await Item.findById(req.params.id)
        .then(item => {
            item.remove();
            res.status(200).json({ message: `item ${item.itemName} has been removed` });
        })
        .catch(error => res.status(200).json({ error: error }));
}


exports.addItemOnSale = async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        if (!item.onSale) {
            item.onSale = true;
            item.save((err) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(400).json({ message: "Item is Active on Sale" });
                }
            })
        } else {
            res.status(400).json({ message: "Item Already On Sale" });
        }
    } else {
        res.status(400).json({ message: "Item not found" })
    }
}

exports.removeItemOnSale = async (req, res) => {
    await Item.findById(req.params.id)
    .then(item => {
        if (item.onSale) {
            item.onSale = false;
            item.save((err) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(400).json({ message: "Item is deactived sale Sale" });
                }
            })
        } else {
            res.status(400).json({ message: "already deActivated" });
        }
    })
}