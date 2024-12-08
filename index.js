const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname,'config','config.env')});
const mongoConnect = require('./config/config');
const userRoutes = require('./routes/UserRoutes');
const itemRoutes = require('./routes/ItemRoutes');
const cartRoutes = require('./routes/CartRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/api/auth',userRoutes);
app.use('/item',itemRoutes);
app.use('/cart',cartRoutes);
app.use('/orders',orderRoutes);

mongoConnect();

app.listen(process.env.PORT,()=>{
    console.log(`Server connected to ${process.env.PORT}`);
})