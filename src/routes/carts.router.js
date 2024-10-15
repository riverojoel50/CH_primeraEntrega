import {Router} from "express";
import { CartsManager } from "../dao/CartsManager.js";
import { logError } from "../utils.js";


export const router = Router()
CartsManager.setPath("./src/data/carts.json")

router.get("/:id", async (req,res) =>{
    let {id} = req.params
    id=Number(id)

    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser numérico`})
    }

    try{
        let carts = await CartsManager.getCarts();

        let cart = carts.find(c => c.id === id);
        if(!cart){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existen el carrito con id ${id}`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({cart});
    }
    catch(error){
        logError(res,error)
    }
})

router.post("/:cid/product/:pid", async(req,res) =>{
    let {cid, pid } = req.params
    cid=Number(cid)
    pid=Number(pid)

    
    if(isNaN(cid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`cid debe ser numérico`})
    }

    if(isNaN(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`pid debe ser numérico`})
    }

    try{
        let carts = await CartsManager.getCarts()
        let cart = carts.find(c => c.id === cid)

        if(!cart){
            res.setHeader('Content-Type','application/json');
                return res.status(404).json({error:`No existen el carrtido con cid ${cid}`})
        }

        if(cart.products.find(p => p.id === pid)){
            carts = await CartsManager.updateCart(cid,pid)
        }
        else{
            carts = await CartsManager.insertCart(cid,pid)
        }
        

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({carts});
    }
    catch(error){
        logError(res,error)
    }
})
