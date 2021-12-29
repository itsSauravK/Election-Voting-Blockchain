//election model

/*
winner:{
name,
image
} ,
candiates : [{
name,
image,
votes
}],
date
*/
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter election name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']

    },
    description: {
        type: String,
        required: [true, 'Please enter election description'],

    },
    winner: {

        isDraw: {
            type: Boolean,
            default: false
        },  //to check if election is draw or not
        winnerName: String,
        winnerVotes: Number,
        winnerImage: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    },
    ratings: {
        type: Number,
        default: 0
    },
    candidates: [ {
        name: String,
        votes: Number,
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    } ],
    
    isOngoing: {  //to check if election is ongoing
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Election', productSchema);