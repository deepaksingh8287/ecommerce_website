import express  from "express";
import { getToken,isAdmin,isAuth } from "../util";
import Product from "../models/ProductModel";
const router=express.Router();

router.get("/",async (req,res)=>{
  const products=await Product.find({})
    res.send(products)
})
router.get("/:id",async (req,res)=>{
    const products=await Product.findOne({_id:req.params.id})
      if(products){
      res.send(products)
      }
      else{
          res.status(404).send({msg:"product not found"})
      }
  })
router.post("/", async (req,res)=>{
    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand:req.body.brand,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description,
        rating:req.body.rating,
        numReviews:req.body.numReviews
    });
    console.log(product)
    const newProduct=await product.save()
    if(newProduct){
       return res.status(201).send({msg:"new product created",data:{newProduct}})
    }
    else{
       return res.status(500).send({msg:"error in creating new product"})
    }
})
router.put("/", async (req,res)=>{
    const productId=req.params.id;
    const product=await findOne({_id:productId})
    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.image=req.body.image;
        product.brand=req.body.brand;
        product.category=req.body.category;
        product.countInStock=req.body.countInStock;
    const updatedProduct=await product.save()
        if(updatedProduct){
            return res.status(200).send({msg:"new product created",data:{newProduct}})
         }
        return res.status(500).send({msg:"error in creating new product"})
    }});

    router.delete("/:id", async (req,res)=>{
        const deleteProduct=await Product.findById(req.params.id)
        if(deleteProduct){
            await deleteProduct.remove();
            res.send("product deleted successfully")
        }
        else{
           res.send("error in deleting product")
        }
    })


export default router