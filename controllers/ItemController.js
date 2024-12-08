const Item = require('../models/ItemModel');

exports.addItem = async(req,res) => {

    try {
        const {name,price,quantity,description,availability,imageUrl} = req.body;

        const existingItem = await Item.findOne({name});
        if(existingItem){
            return res.status(400).json({message:"Item Already exists"})
        }

        const newItem = new Item({name,price,quantity,description,availability,imageUrl});
        await newItem.save();

        res.status(200).json({message:"Item Added Successfully!"})
    } catch (error) {
        res.status(404).json({message:"error adding item"})
    }
}

exports.getItem = async(req,res) =>{
    try {
        const items = await Item.find({});
        res.status(200).json({items})

    } catch (error) {
        res.status(404).json({message:"Failed to fetch item"})
    }
}

exports.getUpdateItem = async(req,res) =>{

    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        if(!item){
            return res.status(404).json({message:"Item not found"})
        }
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({message:"Error fetching item"})
    }
}

exports.updateItem = async(req,res) =>{
    try {
        const itemId = req.params.id;
        const {name,price,quantity,description,availability,imageUrl} = req.body;

        const updatedItem = await Item.findByIdAndUpdate(itemId,{
            name,
            price,
            quantity,
            description,
            availability,
            imageUrl
        },
        {new:true}
    )

    if(!updatedItem){
        res.status(404).json({message:"Item not found"});
    }

    res.status(200).json(updatedItem)

    } catch (error) {
        res.status(500).json({message:"Error while updating"})
    }
}

exports.deleteItem = async(req,res) =>{
    try {
        const itemId = req.params.id;
        const item = await Item.findByIdAndDelete(itemId);

        if(!item){
            res.status(404).json({message:"Item not found"})
        }
        res.status(200).json({message:"Item deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting item"})
    }
}


exports.getItemDetail = async(req,res) =>{

    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        if(!item){
            return res.status(404).json({message:"Item not found"})
        }
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({message:"Error fetching item"})
    }
}

exports.updateQuantity = async (req, res) => {
    try {
      const { incrementBy } = req.body;
      const itemId = req.params.id;
  
      const cart = await Cart.findOne({ "items.itemId": itemId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const item = cart.items.find((item) => item.itemId.toString() === itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      // Update quantity ensuring it remains >= 1
      item.quantity = Math.max(item.quantity + incrementBy, 1);
      await cart.save();
  
      res.status(200).json({ message: "Quantity updated successfully", item });
    } catch (error) {
      res.status(500).json({ message: "Error updating quantity", error });
    }
  };
  