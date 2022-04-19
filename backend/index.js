const express = require("express");

const AdminRoute = require("./routes/AdminRoute");
const VandorRoute = require("./routes/VandorRoute");

const app= express();



app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);


app.listen(8000, () =>{
    console.log('App is running on port 80000');
})