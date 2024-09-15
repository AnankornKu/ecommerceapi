
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors=require('cors');
require('dotenv').config();
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe")

//new add
const paymentRoute = require("./routes/payment")
const bodyParser=require('body-parser');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();});
  app.use(express.static("public"));
  ////////////////////////////////////


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connection Successful!!"))
.catch((err)=>{
    console.log(err)
});

app.use(cors());
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);
app.use("/api/checkout",stripeRoute);
app.use("/api/payment",paymentRoute);


const PORT = process.env.PORT || 3000



app.listen(PORT,()=>{

console.log("Backend Server is running: ",PORT);

});