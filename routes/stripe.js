const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post("/payment",async(req,res)=>{
    console.log("Line 6==========")
    stripe.charges.create(
        {

        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",

    },
    (stripeErr,stripeRes)=>{

        if(stripeErr){
            console.log("Line 18==========")
            res.status(500).json(stripeErr)
        }else{
            console.log("Line 20==========")
            res.status(200).json(stripeRes)
        }
    }
);
console.log("Line 26==========")

});
module.exports = router;

