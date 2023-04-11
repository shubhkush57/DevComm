const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const {check,validationResult} = require('express-validator');
// this section is going to return the user deatilss. so 
//@desc it return the profile of the current user.
//@route GET/api/profile/me 
//access private.
router.get('/me',auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: "This Profile Does not exits."});
        }
        res.send(profile);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg:"server error"});
    }
    // res.send('Profile Deatial..');
});
//@desc it creates the profile of the user.
//@route POST/api/profile
//access private.
// going to check for the profile fields..
router.post('/',[auth,[
    check('skills','Skills is Required').not().isEmpty(),
    check('status','Status is Required').not().isEmpty()
]],async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            linkedin,
            instagram
        } = req.body;
        const profileField = {}; 
        profileField.user = req.user.id;
        if(company) profileField.company = company;
        if(website) profileField.website = website;
        if(location) profileField.location = location;
        if(bio) profileField.bio = bio;
        if(status) profileField.status = status;
        if(githubusername) profileField.githubusername = githubusername;
        if(skills){
            profileField.skills = skills.split(',').map(skill => skill.trim());
        }
        profileField.social = {}; // it was an ojbect.
        if(youtube) profileField.social.youtube = youtube;
        if(twitter) profileField.social.twitter = twitter;
        if(linkedin) profileField.social.linkedin = linkedin;
        if(instagram)  profileField.social.instagram = instagram;
        if(facebook)  profileField.social.facebook = facebook;
        // now we are going to check if this profile already exits ie user 
        // if not exits create a new profile 
        // if exits update the previous one.
        
        // res.send('Hellow roddf');
    try{
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            // user's profile alreay exits..
            profile = await Profile.findOneAndUpdate({user: req.user.id},{$set: profileField},{new: true});
            console.log(profile);
            return res.json(profile)
        }
        else{
            profile = new Profile(profileField);
            await profile.save();
            console.log(profile);
            return res.json(profile);
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg:"Server Error"});
    }
});
// we have to return the profile of all users so that other can see it.
//@desc get all users pofile.
// @route GET/api/profile.
//@auth Public.
router.get('/',async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});

// we have to return the profile of user so that other can see it.
//@desc get the specific user pofile of given id.
// @route GET/api/user/:user_id.
//@auth Public.
router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: "This Page is Not Found Invalid User"});
        }
        res.json(profile);
    }
    catch(err){
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: "This Page is Not Found Invalid User"});
        }
        res.status(500).json({msg: "Server Error"});
    }
});

//@desc DELETE user and his or her profile..
//@route DELETE/api/profile
//privat 
// here is profile of a user is deleted we will be deleting the user also.
router.delete('/',auth,async(req,res)=>{
    try{
        // delete profile
        await Profile.findOneAndRemove({user: req.user.id});
        // delete user also
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: "Profile Deleted"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "server error"});
    }
});

module.exports = router;