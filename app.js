const express=require('express');
const app=express();
const productsRoute= require('./api/routers/products');
const ordersRoute=require('./api/routers/orders');
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect('mongodb+srv://admin:'+process.env.MONGO_ATLAS_PW+'@atlascluster.9wsb9y1.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise=global.Promise;

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
//HATALARI ÖNLEMİMİZİ SAĞLAR
app.use((res,req,next)=>{
    res.header(
        "Access-Control-Allow-Orijin","*"
    );
});

app.use((res,req,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "Orijin, X-Requested, Content-Type, Accept, Authorization"
    );
    if(req.method=="OPTIONS"){
        res.header(
            'Access-Control-Allow-Methods',
            'POST, GET, DELETE, PATCH, PUT'

        );
        return res.status(200).json({});
    }

    next();
    
});

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