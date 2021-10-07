const router = require('express').Router();
const { signIn } = require('../controllers/user');

router.post('/signin', signIn);

module.exports = router;