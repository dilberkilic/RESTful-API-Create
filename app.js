const express=require('express');
const app=express();
const productsRouter= require('./api/routers/products');

/*app.use((req,res,next)=>{
    res.status(200).json({
        message:'It works'
    });
});*/
app.use('/products',productsRouter);

module.exports = app;