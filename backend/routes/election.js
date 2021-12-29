const express = require('express')
const router = express.Router();

const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../middlewares/auth');

const {
    addElection,
    showCurrentElection, 
    startElection,
    showAllElection,
    oneResult,
    endElection
} = require('../controllers/electionControllers');



//user routes
router.route('/showElection').get(isAuthenticatedUser, showCurrentElection);

//admin routes
router.route('/addElection').post(isAuthenticatedUser, authorizeRoles('admin'), addElection);
router.route('/startElection').get(isAuthenticatedUser, authorizeRoles('admin'), startElection);
router.route('/endElection').put(isAuthenticatedUser, authorizeRoles('admin'), endElection);

//accesed by all routes
router.route('/AllElections').get(showAllElection);  //result of all elections
router.route('/result/:id').get(oneResult); //result of one election

module.exports = router;