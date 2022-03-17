const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const { startElection, endElection } = require('../controllers/electionControllers');

//admin routes
router.route('/startElection').get(isAuthenticatedUser, authorizeRoles('admin'), startElection);
router.route('/endElection').put(isAuthenticatedUser, authorizeRoles('admin'), endElection);

module.exports = router;
