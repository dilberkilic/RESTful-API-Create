const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Hangling GET request to /products'
    });
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'Hangling POST request to /products'
    });
});

module.exports=router;