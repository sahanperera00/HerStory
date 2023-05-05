import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dob: {
        type: Date,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    
})