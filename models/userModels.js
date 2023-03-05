const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
username:{
    type:String , 
    minLength: 1, 
    maxLength:10, 
    required: [true, 'This field is required']
    

}, 

email:{
    type:String, 
    minLength:1, 
    maxLength:10, 
    required: [true, 'This field is required']
}, 

password:{
    type:String, 
    required: [true, 'This field is required'],
    validate:{
        validator: (password) =>{
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            return passwordRegex.test(password);
        }, 
        message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"

    },

}



})


module.exports = mongoose.model('User', userSchema);