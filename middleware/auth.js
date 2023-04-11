// this verify the jwt token of the user and allow them to login
const jwt = require('jsonwebtoken');
const config = require('config');

function middleWare (req,res,next){
    // take the token 
    const token = req.header('x-auth-token');
    if(!token){
        // if token doens't exits..
        return res.status(401).json({msg: 'Token Does not exit'});
    }
    // if token exits.
    // verify token
    try{
        // we will verfiy token with our scered jwt id
        const decoded = jwt.verify(token,config.get('jwtSceretToken'));
        // if user verifted
        // it gives us the user it has find from the token..
        req.user = decoded.user;
        next(); // next callback function.
    }
    catch(err){
        res.status(400).json({msg: 'Invalid Token'});
    }
}

module.exports = middleWare;