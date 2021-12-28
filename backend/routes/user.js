const express = require('express')
const router = express.Router();

const { 
    generateOTP, registerUser, loginUser, allUsers, deleteUser
 } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/generateOtp').post(generateOTP);
router.route('/login').post(loginUser);

//admin
router.route('/allUsers').get(allUsers);
router.route('/delete/:id').delete(deleteUser);
module.exports = router;