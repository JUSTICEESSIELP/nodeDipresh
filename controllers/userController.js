const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const contactModel = require('../models/contactModel');
const crypto = require('crypto');
const { access } = require('fs');


const registerUser = asyncHandler(async (err, req, res, next)=>{
const {username, email, password}  = req.body;
if (!username || !email || !password){
    res.status(401)
    res.json({
        "message":"This Field is required"
    })
}
const checkDuplicate = await User.findOne({email:email});
console.log(checkDuplicate);
if(checkDuplicate){
    res.status(401)
   throw new Error('This error already exist ')
}
const hashedPassword = await bcrypt.hash(passowrd, 10)
const registeredUser = await User.create({
    username:username, 
    email:email, 
    password:hashedPassword, 

})
console.log(`User created and has name ${registerUser.name}`)

if (registerUser) {
  res.status(201).json({ _id: registerUser.id, email: registerUser.email });
} else {
  res.status(400);
  throw new Error("User data us not valid");
}
res.json({ message: "Register the user" });

})



const loginUser =asyncHandler(async ()=>{
    const {username, email , password } = req.body;
        if (!username || !email || !password){
            res.status(401)
            res.json({
                "message":"This Field is required"
            })
        }

    //  if we have the required fields being filled then what we need to do if find an email in the DB that is in the field

        const availableUser = await User.findOne({email:email})
            if(!availableUser){
                res.status(401)
                throw new Error('This user is not a member Please Login');
            }
            const compareHash = await bcrypt.compare(password, availableUser.passowrd)
            if(compareHash){
                

            // Generate a random access token using the crypto module
            // const accessToken = crypto.randomBytes(64).toString('hex');

            // // Generate a random refresh token using the crypto module
            // const refreshToken = crypto.randomBytes(64).toString('hex');

      
                const accessToken = await jwt.sign(
                    {
                         User:{
                                username:username, 
                                email:email

                            }
                }, 
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" } 


                )

                res.send(200).json(accessToken)

            }else{
                res.status(401);
                throw new Error('email or password is not valid ')
            }


})




const getCurrentUser = asyncHandler(async( err, req, res, next)=>{


})



module.exports = {
    loginUser, 
    registerUser
}