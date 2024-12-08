// controllers/orderController.js

const Order = require('../models/OrderModel');

// Get orders by userId
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find orders by userId and populate item details
    const orders = await Order.find({ userId })
      .populate('items.itemId', 'name price')  // Populating the item details
      .populate('userId', 'name email');      // Populating the user details

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('userId', 'name email').populate('items.itemId', 'name price'); // Populate user and item details
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Update order status (for admin to mark order as ready)
  exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
  
    try {
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
