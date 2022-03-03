const express = require('express');
const router = express.Router();

const {
   getUser,
   generateOTP,
   registerUser,
   loginUser,
   allUsers,
   deleteUser,
   logoutUser,
   vote,
   editUser,
} = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/generateOtp').post(generateOTP);
router.route('/login').post(loginUser);

//all users
router.route('/logout').get(logoutUser);
router.route('/vote').put(isAuthenticatedUser, vote);
router.route('/getUser').get(isAuthenticatedUser, getUser);
router.route('/edit').put(isAuthenticatedUser, editUser);

//admin
router.route('/register').post(isAuthenticatedUser, authorizeRoles('admin'), registerUser);
router.route('/allUsers').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route('/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
module.exports = router;
