const express=require('express');
const router=express.Router();
const Product=require('../models/products');
const mongoose=require('mongoose');
const e = require('express');

router.get('/',(req,res,next)=>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(
        docs=>{
            const response={
                count:docs.length,
                product:docs.map(doc=>{
                    return {
                        name:doc.name,
                        price:doc.price,
                        _id:doc._id,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/products/'+doc._id
                        }
                    }
                })
            }
            //if(docs.length>=0){
                res.status(200).json(response);
           // }else{
                res.status(404).json({
                    message:'No entries found'
                });
            //}
            
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
            message:'Created product succesfully',
            createProduct:{
                name:result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type:'POST',
                    url:'http://localhost:3000/products/'+result._id
                }
            },
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
Product.findById(id)
.select()
.exec('name price _id')
.then(doc=>{
    console.log(doc);
    res.status(200).json(
        {
            product:doc,
            request:{
                type:'POST',
                url:'http://localhost:3000/products/'+doc._id
            }
        }
    );
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
        res.status(200).json({
            message:'Product updated',
            request:{
                type:'GET',
                url:'http://localhost:3000/products/'+id
            }
        });
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
    res.status(200).json({
        message:'Product deleted',
        request:{
            type:'POST',
            url:'http://localhost:3000/products/'+id,
            body:{name:'String',price:'Number'}
        }
    });
   }

   ).catch(
    error=>{
        res.status(500).json({error:error});
    }
   );
});

module.exports=router;