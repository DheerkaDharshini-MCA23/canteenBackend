const express = require('express');
const router = express.Router();
const {addToCart,getCart,removeItemFromCart,checkout} = require('../controllers/CartController')


router.post("/addtocart", addToCart);
router.get('/getcart/:userId', getCart);
router.delete('/removeitem',removeItemFromCart);
router.post('/checkout',checkout)

module.exports = router;    