// routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const {getAllOrders,updateOrderStatus} = require('../controllers/OrderController');
// Route to fetch orders by userId
router.get('/getorders/:userId', orderController.getOrdersByUserId);

// Route to get all orders
router.get('/allOrders', getAllOrders);

// Route to update order status
router.put('/updateOrderStatus', updateOrderStatus);

module.exports = router;
