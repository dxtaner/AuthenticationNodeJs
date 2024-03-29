const express = require('express');
const authController = require('../controllers/authController');
const googleLoginController = require('../controllers/google-login-controller');
const profileController = require('../controllers/profileController');
const twitterController = require('../controllers/twitterController');
const facebookController = require('../controllers/facebookController');
const jwtMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(jwtMiddleware);
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/getAllUser', authController.getAllUsers);

router.post('/google-login',googleLoginController.googleLogin);
// router.get('/googleCallback',googleLoginController.googleCallback);

router.post('/linkedin-login', authController.linkedinLogin);

router.post('/twitter', twitterController.twitterLogin);

router.post('/facebook', facebookController.facebookLogin);


router.patch('/profile/:id', profileController.updateProfile);

module.exports = router;
