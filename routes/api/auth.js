const express = require('express');
const router = express.Router();

// this section is going to return the user deatilss. so 
//@desc above
//@route GET/api/auth
//access public
router.get('/',(req,res)=>{
    res.send('Auth Deatial..');
});

module.exports = router;