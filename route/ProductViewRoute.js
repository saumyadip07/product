const express=require("express");
const Upload=require("../utility/image")
const {verifyToken}=require("../App/Middleware/authHelper")
const {Authcheck}=require('../App/Controller/ProductController')
const ProductController=require("../App/Controller/ProductController")


const ProductViewRouter=express.Router()

ProductViewRouter.get('/productForm',verifyToken,Authcheck,ProductController.createForm)
ProductViewRouter.post('/create/product',Upload.single('image'),ProductController.createProduct)
ProductViewRouter.get("/allProduct",verifyToken,Authcheck,ProductController.allProduct)
ProductViewRouter.get("/generatePdf",ProductController.generatePdf)



module.exports=ProductViewRouter