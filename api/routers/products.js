const express=require('express');
const router=express.Router();
const Product=require('../models/products');
const mongoose=require('mongoose');
const e = require('express');

router.get('/',(req,res,next)=>{
    Product.find().exec().then(
        docs=>{
            console.log(docs);
            if(docs.length>=0){
                res.status(200).json(docs);
            }else{
                res.status(404).json({
                    message:'No entries found'
                });
            }
            
        }).catch(
            err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            }
        );
});

router.post('/',(req,res,next)=>{

    const product={
        name: req.body.name,
        price: req.body.price,
    };
    const products=new Product({
      _id:mongoose.Types.ObjectId(),
      name:req.body.name,
      price:req.body.price
    });
    products.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:'Handling POST request to /products',
            createProduct: result,
        });
    }).catch(error=>{
        console.log(error);
        res.status(500).json({
            err:error
        });
    });
    
});

router.get('/:productsId',(req,res,next)=>{
const id=req.params.productsId;
Product.findById(id).exec().then(doc=>{
    console.log(doc);
    res.status(200).json(doc);
}).catch(err=>
    {
        console.log(err);
        res.status(200).json({error:err});
    }
)
});

router.patch('/:productsId',(req,res,next)=>{
    const id=req.params.productsId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.updateOne(
        {_id:id},
        {$set:updateOps}
    ).exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>
        {
            console.log(err);
            res.status(200).json({error:err});
        });
});

router.delete('/:productsId',(req,res,next)=>{
    const id=req.params.productsId;
   Product.remove({
    _id:id
   }).exec().then(result=>{
    res.status(200).json(result);
   }

   ).catch(
    error=>{
        res.status(500).json({error:error});
    }
   );
});

module.exports=router;