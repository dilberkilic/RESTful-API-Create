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

router.get('/:productsId',(req,res,next)=>{
const id=req.params.productsId;
if(id==='special'){
    res.status(200).json({
        message:'You discovered the pecial ID',
        id:id
    });
}else{
    res.status(200).json({
        message:'You passed an ID'
    });
}
});

module.exports=router;