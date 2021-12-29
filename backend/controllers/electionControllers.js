const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const Election = require('../models/election');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');


// Function to add election one election in db 
//=> /api/election/addElection    
//- can only be accessed by admin
exports.addElection = catchAsyncError(async (req, res, next) => {

    const { name, description } = req.body;

    const election = await Election.create({
        name,
        description
    })
    res.status(200).json({
        success:true,
        election
    })

} )

//Function to start election 
// => api/election/startElection
// admin access

exports.startElection = catchAsyncError(async (req, res, next) => {

    const users = await User.find();
    users.forEach(user => {
        
        //sending an email to each user that election has started
        electionEmail(user, "Election has started. Login to vote", next);

        //Updating each user ongoing variable to true
        updateUser(user);
    });

    res.status(200).json({
        success:true
    })

})

async function updateUser(user){

    await User.findByIdAndUpdate(user.id, {electionOngoing: true}, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
}
//function to send email that election has started
async function electionEmail(user, message ,next){
    
    try{
        await sendEmail({
            email: user.email,
            subject: "Election",
            message
        })

    }catch(error){
        return(next( new ErrorHandler('Internal Server Error', 500)));
    }
}

//Function to show current election
// => api/electron/showElection
//user and admin access

exports.showCurrentElection = catchAsyncError(async (req, res, next) => {

    const election = await Election.find({isOngoing: true});
    if(!election){
        res.status(200).json({
            success:false,
            message:"No ongoing election"
        })
    }
    res.status(200).json({
        success:true,
        election
    })
})

//Function to end election
// => api/election/endElection
// admin access


//function to show one election result
///api/election/:id    
//- can be accessed by anyone
exports.oneResult = catchAsyncError(async (req, res, next) => {

    election = await Election.findById(req.params.id);

    if(!election){
        return next(new ErrorHandler('Invalid ID', 401));
    }
    res.status(200).json({
        success: true,
        election
    })
})
//function to show all elections result in db 
//=> /api/election/allElections   
//- Can be accessed by anyone
exports.showAllElection = catchAsyncError(async (req, res, next) => {

    const elections = await Election.find({isOngoing:false});

    if(!elections){
        res.status(200).json({
            success: true,
            message: "No ongoing elections"
        })
    }
    res.status(200).json({
        success: true,
        elections
    })
})