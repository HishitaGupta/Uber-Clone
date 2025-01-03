const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',

    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ["car", "motorcycle", "auto"],
        required: true
    },
    fare:{
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        
    },// in meters
    duration:{
        type: Number,
       
    }, //in secs
    status: {
        type: String,
        enum:[ "pending", "accepted", "completed", "cancelled","ongoing"],
        default: "pending",

    },
    paymentID: {
        type: String,
        
    },
    orderId: {
        type: String,
    
    },
    signature: {
        type: String,
      
    },
    otp: {
        type: String,
       select: false,
       required: true
    },

}, {
    timestamps: true
}

)

module.exports = mongoose.model('ride', rideSchema);