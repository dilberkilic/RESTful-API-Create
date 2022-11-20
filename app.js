const express=require('express');
const app=express();
const productsRoute= require('./api/routers/products');
const ordersRoute=require('./api/routers/orders');

/*app.use((req,res,next)=>{
    res.status(200).json({
        message:'It works'
    });
});*/

app.use('/products',productsRoute);
app.use('/orders',ordersRoute);

module.exports = app;