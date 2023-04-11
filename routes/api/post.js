const express = require('express');
const router = express.Router();

// this section is going to return the user deatilss. so 
//@desc above
//@route GET/api/post
//access public
router.get('/',(req,res)=>{
    res.send('Post Deatial..');
});

module.exports = router;