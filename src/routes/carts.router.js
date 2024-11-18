import {Router} from "express";
import { CartsManager } from "../dao/CartsManager.js";
import {Types} from "mongoose";
import { logError } from "../utils.js";
import {CartsDAO} from "../dao/CartsDAO.js"
import { ProductsDAO } from "../dao/ProductsDAO.js";


export const router = Router()

router.get("/:cid", async (req,res) =>{
    try{
        console.log("entrada endopoiunt cart")
        let {cid} = req.params
        let cart = await CartsDAO.getCartsPopulate(cid);

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({cart});
    }
    catch(error){
        logError(res,error)
    }
})

router.put("/:cid", async (req,res) =>{
    let {cid} = req.params
    let {products} = req.body
    try{

        let newCart = await CartsDAO.updateCarts(cid,products)

       res.setHeader('Content-Type','application/json');
        return res.status(200).json({newCart});

    }
    catch(error){
        logError(res,error)
    }
})


router.put("/:cid/product/:pid", async (req,res) =>{
    let {cid, pid} = req.params
    let {quantity} = req.body

    try{
        let cart = await CartsDAO.getCarts(cid);
        let newCart;
        
        for(const product of cart[0].products){
            if(product.productId == pid){
                product.quantity =  product.quantity + quantity
                newCart = await CartsDAO.updateCarts(cid,cart[0].products)
                break;
            }
            else{
                newCart = await CartsDAO.newItemCarts(cid,pid,quantity)
                break;
            }
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({newCart});

    }
    catch(error){
        logError(res,error)
    }
})


router.delete("/:cid/product/:pid", async (req,res) =>{
    let {cid, pid} = req.params

    try{
        let cart = await CartsDAO.getCarts(cid);

        let products = cart[0].products.filter(p => p.productId != pid) 
    
        let newCart = await CartsDAO.updateCarts(cid,products)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({newCart});

    }
    catch(error){
        logError(res,error)
    }
})

router.delete("/:cid", async (req,res) =>{
    let {cid} = req.params

    try{
        let newCart = await CartsDAO.updateCarts(cid,[])
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({newCart});

    }
    catch(error){
        logError(res,error)
    }
})


router.post("/:cid/product/:pid", async(req,res) =>{
    let {cid, pid } = req.params
    let {quantity} = req.body

    try{
        let newCart;
        //Si es el primer articulo a ingresar entonces se crea el carrito.
        if(cid === "0"){
            newCart = await CartsDAO.insertCarts(pid,quantity)
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({newCart});
    }
    catch(error){
        logError(res,error)
    }
})
