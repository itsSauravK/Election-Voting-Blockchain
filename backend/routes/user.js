const express = require('express')
const router = express.Router();

const { 
    generateOTP, registerUser
 } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/generateOtp').post(generateOTP);

module.exports = router;