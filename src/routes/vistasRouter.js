import { Router } from 'express';
import { ProductsManager } from "../dao/ProductsManager.js";
import { ProductsDAO } from '../dao/ProductsDAO.js';
import { CartsDAO } from '../dao/CartsDAO.js';

export const router=Router()

let products = //await ProductsDAO.getProducts()

router.get('/products', async (req,res)=>{
    let {page, limit, category, status, sort} = req.query
    //Status: parametro que utilizaremos para verificar disponibiliadd.

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
    let carts = await CartsDAO.getCarts(cid)

    let {docs: cartss,} = await CartsDAO.getCarts(cid)

    let products = carts[0].products.map(product => ({
        ...product,
        productId: product.productId.toString()
    }));

    //let products = carts[0].products
    console.log(cartss.products)

    res.render("cart", {
        products
    })

})

