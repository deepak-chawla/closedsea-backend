const router = require('express').Router();
const { requireSignIn } = require('../common-middleware');
const { signIn, getMyProfile, follow, profile } = require('../controllers/user');

router.post('/signin', signIn);
router.get('/myprofile', requireSignIn, getMyProfile);
router.put('/follow/:followId', requireSignIn, follow);
router.get('/profile/:id', profile);

module.exports = router;