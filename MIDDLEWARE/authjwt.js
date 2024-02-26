const jwt = require("jsonwebtoken");
const config = require("../CONFIG/auth.config.js");


verifyToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];//Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];//
    if(token ==null) return res.status(401).json({error:'Null tokken'});
    jwt.verify(token,config.access_secret,(error,user) =>{
        if(error) return res.status(403).json({error:error.message});
        req.user =user;
        next();//carry on handiling the request
    });
}   
const authJwt = {
    verifyToken: verifyToken
}
module.exports = authJwt