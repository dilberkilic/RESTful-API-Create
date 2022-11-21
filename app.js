const express=require('express');
const app=express();
const productsRoute= require('./api/routers/products');
const ordersRoute=require('./api/routers/orders');
const morgan=require('morgan');
const bodyParser=require('body-parser');

/*app.use((req,res,next)=>{
    res.status(200).json({
        message:'It works'
    });
});*/ 

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/products',productsRoute);

app.use('/orders',ordersRoute);

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;