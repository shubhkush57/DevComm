const express = require('express');
const router = express.Router();

// this section is going to return the user deatilss. so 
//@desc above
//@route GET/api/profile
//access public
router.get('/',(req,res)=>{
    res.send('Profile Deatial..');
});

module.exports = router;