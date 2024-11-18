import { Router } from 'express';
import { ProductsManager } from "../dao/ProductsManager.js";
import { ProductsDAO } from '../dao/ProductsDAO.js';
import { CartsDAO } from '../dao/CartsDAO.js';
import { mongoose } from 'mongoose';
import { productsModel } from '../dao/models/products.model.js';

export const router=Router()

router.get('/products', async (req,res)=>{
    let {page, limit, category, status, sort} = req.query

    let {docs: products, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage} = await ProductsDAO.getProducts(page, limit, category, status, sort)

    res.render("home", {
        products,
        totalPages, 
        hasNextPage, 
        hasPrevPage, 
        nextPage, 
        prevPage
    })

})



router.get('/cart/:cid', async (req,res)=>{
    let {cid} = req.params
    let carts = await CartsDAO.getCartsPopulate(cid)
    
    let products = carts[0].products.map(product => ({
        productId: product.productId.toObject(), 
        quantity: product.quantity,
        cid: cid
    }));

    res.render("cart", {
        products,
        cid
    });

})


router.get('/product/:pid', async (req,res)=>{
    let {pid} = req.params

    const product = await productsModel.findById(pid);

    const plainProduct = product.toObject();

    res.render("product", {
        product: plainProduct
    })

})



