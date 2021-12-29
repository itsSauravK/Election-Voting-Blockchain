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
        winnerName: String,
        winnerVotes: Number,
        winnerImage: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
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
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    } ],

    isDraw: {
        type: boolean,
        default: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Election', productSchema);