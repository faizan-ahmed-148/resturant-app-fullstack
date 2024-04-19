const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();



router.route("/payment/process").post(isAuthenticated, processPayment);

router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

module.exports = router;