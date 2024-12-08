const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");

exports.addToCart = async (req, res) => {
    try {
      const { userId, itemId, name, price, quantity } = req.body;
  
      if (quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      // Check if the item already exists in the cart
      const existingItem = cart.items.find((item) => item.itemId.toString() === itemId);
  
      if (existingItem) {
        // Update the quantity, ensuring it stays valid
        existingItem.quantity = Math.max(existingItem.quantity + quantity, 1);
      } else {
        // Add new item to the cart
        cart.items.push({ itemId, name, price, quantity });
      }
  
      await cart.save();
      res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Error adding to cart", error });
    }
  };
  

exports.getCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the cart for the specified user
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({
          message: 'Cart not found for this user',
          cart: { items: [] }, // Return an empty cart if no data exists
        });
      }
  
      // Return the cart data
      res.status(200).json({
        message: 'Cart fetched successfully',
        cart,
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };


  exports.removeItemFromCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Remove the item from the cart's items array
      cart.items = cart.items.filter(item => item.itemId.toString() !== itemId.toString());
  
      // Save the updated cart
      await cart.save();
      res.json({ message: "Item removed from cart" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };


  exports.checkout = async (req, res) => {
    try {
      const { userId, items, totalPrice, deliveryAddress } = req.body;
  
      // Create an order document
      const order = new Order({
        userId,
        items,
        totalPrice,
        status: 'Pending', // Order status initially 'Pending'
        deliveryAddress,
      });
  
      // Save the order to the database
      await order.save();
  
      // Optionally, clear the user's cart after checkout (if required)
      const cart = await Cart.findOne({ userId });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
  
      res.json({ message: 'Checkout successful', orderId: order._id });
    } catch (err) {
      console.error('Checkout error:', err);
      res.status(500).json({ message: 'An error occurred during checkout' });
    }
  };