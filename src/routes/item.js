const router = require('express').Router();
const { createSingleItem, getAllItems, deleteItemById, 
  addItemOnSale, removeItemOnSale, getItem } = require('../controllers/item');
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

router.post('/create-item', requireSignIn,  createSingleItem);
router.get('/get-items', getAllItems);
router.get('/get-item/:id', getItem);
router.delete('/delete-item/:id', requireSignIn, deleteItemById);
router.post('/onsale-item/:id', requireSignIn, addItemOnSale);
router.post('/offsale-item/:id', requireSignIn, removeItemOnSale);

module.exports = router;