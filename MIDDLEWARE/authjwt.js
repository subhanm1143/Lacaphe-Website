const jwt = require("jsonwebtoken");
const config = require("../CONFIG/auth.config.js");
const db = require('../DATABASE/database'); 

//checks if user has a token
verifyToken = (req,res,next) =>{
    const token = req.cookies['token'];
    if(token ==null) return res.status(401).json({error:'Null token'});// No token found
    jwt.verify(token,config.access_secret,(error,user) =>{
        if(error) return res.status(403).json({error:error.message});// Token validation failed
        req.user =user; // Token is valid, proceed
        console.log(user.role);
        next();//carry on handiling the request
    });
}

verifyAdmin = (req,res,next) =>{

    const token = req.cookies['token'];
    if(token ==null) return res.status(401).json({error:'Null token'});
    jwt.verify(token,config.access_secret,(error,decoded) =>{
        if(error) return res.status(403).json({error:error.message});// Token validation failed
        if(decoded.role == 'admin'){
            next();//carry on handiling the request
            return;
        }
        //else
        return res.status(403).send({
            message: "Require Admin Role!"
        });
        
    });
}
verifyUser = (req,res,next) =>{

    const token = req.cookies['token'];
    if(token ==null) return res.status(401).json({error:'Null token'});
    jwt.verify(token,config.access_secret,(error,decoded) =>{
        if(error) return res.status(403).json({error:error.message});// Token validation failed
        if(decoded.role == 'user'){
            next();//carry on handiling the request
            return;
        }
        //else
        return res.status(403).send({
            message: "Requires User Role!"
        });
        
    });
}
const authJwt = {
    verifyToken: verifyToken,
    verifyAdmin: verifyAdmin,
    verifyUser : verifyUser 
}
module.exports = authJwt