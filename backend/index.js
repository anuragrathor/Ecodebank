const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const AdminRoute = require("./routes/AdminRoute");
const VandorRoute = require("./routes/VandorRoute");
const userRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const mailRoute = require("./routes/mailSend");

const app= express();


mongoose.connect(
    process.env.MONGO_URL
 )
 .then(()=>  console.log("DB connection succesful"))
 .catch((err) =>{
     console.log(err);
 });
 
 app.use(express.json());  
 
 app.use('/admin', AdminRoute);
 app.use('/vandor', VandorRoute); 
 app.use("/auth", AuthRoute);
 app.use("/user", userRoute);
 app.use("/product", productRoute);
 app.use("/sendmail", mailRoute);



app.listen(8000, () =>{
    console.log('App is running on port 80000');
})