const express = require('express');
const router = express.Router();
// we need to check the valdiation of the body which is coming.
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const garavatar = require('gravatar');
const bycrypt = require('bcryptjs');
// this section is going to return the user deatilss. so 
//@desc above
//@route POST/api/users
//access public
// this to register the user.
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Email is requried').isEmail(),
    check('password','Please Enter 6 or more digit pass').isLength({min:6})
],
    async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    
    const {name,email,password} = req.body;
    try{
        // if there is not eror
        // if user exits we need to send some message already registered log in
        // Get User garavator
        // encrypit password
        // send re as json.
        // console.log(req.body);
        // checking if user exits
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors: [{msg: 'User Already Exits'}]});
        }
        // if user not exits save it's travator and register the user.
        const avatar = garavatar.url(email,{
            s:'200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,email,password,avatar
        });
        // and bycrypist the password of hte user.
        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password,salt);
        await user.save();
        // user has been register return it's accessToken JWT token.

        res.send('User Registered');
    }
    catch(err){
        console.log(err);
        res.status(500).json({'msg': 'server error'}); // if anything else hapens.

    }
    
});

module.exports = router;