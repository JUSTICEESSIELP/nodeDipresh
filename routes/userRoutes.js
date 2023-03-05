const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require('../controllers/userController');



router.route('/register').post(registerUser);


router.route('/login').post(loginUser);

router.route('/current').get();

module.exports = router;