const router = require("express").Router();

router.get('/', (req, res, next)=>{
    res.json({message : "Hello from Vandor"});
})


module.exports = router