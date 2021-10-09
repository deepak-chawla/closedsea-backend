const router = require('express').Router();
const { createSingleItem, getAllItems, deleteItemById, 
  addItemOnSale, removeItemOnSale } = require('../controllers/item');
const { requireSignIn } = require('../common-middleware/');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });

router.post('/create-item', requireSignIn, upload.single('itemImg'), createSingleItem);
router.get('/get-items', getAllItems);
router.delete('/delete-item/:id', requireSignIn, deleteItemById);
router.post('/onsale-item/:id', requireSignIn, addItemOnSale);
router.post('/offsale-item/:id', requireSignIn, removeItemOnSale);

module.exports = router;