const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const verifyJwt = asyncHandler(async (err, res, req, next)=>{
    //  so this is the middleware that we are going to use to protect the routes . To this well what we are going to do 
    //  is that we are going to compare the accessToken which would be sent in when the user is requesting the route 
    //  the request would have the Access Token so now we are going to extract     req.header.Authorization || req. header. authorization
    var tokenFromRequest; 
    if (req.header.Authorization || req.header.authorization){
        const seperateBearer = req.header.Authorization.startWith("Bearer ")
        
        
        tokenFromRequest =seperateBearer.split(" ")[1]
        if(tokenFromRequest){
            await jwt.verify(
                tokenFromRequest, 
                process.env.ACCESS_TOKEN_SECRET, 
                (err, decoded)=>{
                    if(decoded){
                        req.user = decoded.User
                        next();
                    }
    
                }
            )
            
    

        }else{
            res.status(401);
            throw new Error('User is not authorized or token is missing')
        }


        
    }
    



    
    
})

module.exports = verifyJwt;