const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const {check,validationResult} = require('express-validator');
const bycrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// this section is going to return the user deatilss. so 
//@desc above
//@route GET/api/auth
//access public
// applying the middlware before everything to check for the authemication.
router.get('/',auth,async (req,res)=>{
    // res.send('Auth Deatial..');
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    }
    catch(err){
        console.log(err.message);
        res.status(500).send({msg: 'Server Error'});
    }


});
// now for the logint authenticatoin of the user we need to send email and passsword as body and 
// checking for the validation and after that if password match send the jwt token.
//@desc authncation of the user
// POST/ api/auth
router.post('/',[
    check('email','Email is requried').isEmail(),
    check('password','Please Enter 6 or more digit pass').exists()
],
    async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    
    const {email,password} = req.body;
    try{
        // if there is not eror
        // if user exits we need to send some message already registered log in
        // Get User garavator
        // encrypit password
        // send re as json.
        // console.log(req.body);
        // checking if user exits
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg: 'User doest not exits.'}]});
        }
      
        // we need to check the password is it matching with the token password.
        const isMatch = bycrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials."});
        }
        // user has been register return it's accessToken JWT token.
         const payload = {
            user: {
                id: user.id
            }
         };
         jwt.sign(payload,config.get('jwtSceretToken'),{expiresIn: 360000},(err,token)=>{
            if(err){
                throw err;
            }
            res.json({token}); 
         })
        // res.send('User Registered'); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({'msg': 'server error'}); // if anything else hapens.

    }
    
});
module.exports = router;