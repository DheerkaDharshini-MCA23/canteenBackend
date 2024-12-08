const express = require('express');
const router = express.Router();
const {addItem,getItem,updateItem,getUpdateItem,deleteItem,getItemDetail,updateQuantity} = require('../controllers/ItemController');

router.post('/additem',addItem);
router.get('/getitem',getItem);
router.get('/updateitem/:id',getUpdateItem);
router.put('/updateitem/:id',updateItem);
router.delete('/deleteitem/:id',deleteItem);
router.get('/getitemdetail/:id',getItemDetail);
router.put('/updatequantity/:id', updateQuantity);


module.exports = router;