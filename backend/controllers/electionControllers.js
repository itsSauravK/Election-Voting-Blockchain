const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');

// Function to add election one election in db => /api/election/addElection    - can only be accessed by admin
exports.addElection = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `route working`
    })  
})


//function to show one election /api/election/:id    - can be accessed by user and admin

//function to show all elections in db => /api/election/allElections   - Can be only accessed by admin
