const express = require("express");
const { newOrder,
    getSingleOrder,
    MyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder } = require("../controllers/orderController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");

const router = express.Router();



router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, MyOrders);

router
    .route("/admin/orders")
    .get(isAuthenticated, authorizeRole("admin"), getAllOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticated, authorizeRole("admin"), updateOrder)
    .delete(isAuthenticated, authorizeRole("admin"), deleteOrder);

module.exports = router;