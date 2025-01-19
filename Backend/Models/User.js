const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
   
    email: {
        type:String,
        required:true,
        unique:true,
        maxLength:50,
        trim: true, 
        lowercase: true 
    },

    password: {
        type:String,
        required:true,
        trim: true,
        maxLength:500
    },

    role:{
        type:String,
        enum: ['Admin', 'User'],
        default: 'Admin'     
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, 
{ 
    timestamps: true  
}); 


module.exports = mongoose.model('User', userSchema);



