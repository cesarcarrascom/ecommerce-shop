const router = require("express").Router();

const {handlePayment} = require("./stripeController")

router.post("/payment", handlePayment)

module.exports = router;
