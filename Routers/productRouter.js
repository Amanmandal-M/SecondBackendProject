const express = require('express');
const {getProducts,postProducts,updateProducts,deleteProducts} = require('../Controller/ProductController');


const productRouter = express.Router();


productRouter.get("/",getProducts)

productRouter.post("/create",postProducts)

productRouter.patch("/update/:id",updateProducts)

productRouter.delete("/delete/:id",deleteProducts)



module.exports = {productRouter}
