const router = require('express').Router();
const { createSingleItem } = require('../controllers/item');
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

module.exports = router;