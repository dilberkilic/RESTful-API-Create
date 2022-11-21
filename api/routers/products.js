const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling GET request to /products Dilber ENESİ ÇOK SEVİYOR'
    });
});

router.post('/',(req,res,next)=>{

    const product={
        name: req.body.name,
        price: req.body.price,
    };
    res.status(201).json({
        message:'Handling POST request to /products',
        createProduct: product,
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

router.patch('/:productsId',(req,res,next)=>{
    res.status(200).json({
        message:'UPDATE product'
    });
});

router.delete('/:productsId',(req,res,next)=>{
    res.status(200).json({
        message:'DELETE product'
    });
});

module.exports=router;