const router = require("express").Router();

router.post("/add", (req, res) =>{
    const username = req.body.username;
    res.send("user test is successful"+username);
});

router.post("/update", (req, res) =>{
    res.send("user test is successful");
});

router.post("/delete", (req, res) =>{
    res.send("user test is successful");
});

router.get("/list", (req, res) =>{
    res.send("user test is successful");
});

module.exports = router