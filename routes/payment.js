// This is your test secret API key.
const stripe = require("stripe")('sk_test_51PnyMf011vKlIY3VG6GmmMvj939y8bLVpxW6hFGXKczuM4Ubk4w9fCGtc3mZD7TheqaGvP2DwXDy3GAjmcsVvlAH008gP1bxRW');
const router = require("express").Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");


const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};
console.log("line 19")

router.get("/",async(req,res)=>{
  console.log("line 21");
  res.send("Server Ready");
})

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "thb",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent.client_secret)
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


module.exports = router;