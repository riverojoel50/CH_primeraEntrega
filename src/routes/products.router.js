import {Router} from "express";
import { ProductsManager } from "../dao/ProductsManager.js";
import { logError } from "../utils.js";
import { dirname } from 'path';

export const router = Router()
ProductsManager.setPath("./src/data/products.json")


router.get("/", async (req,res) =>{
    let {limit} = req.query
    let products = await ProductsManager.getProducts()
    if(limit){
        limit=Number(limit)
        if(isNaN(limit)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`limit debe ser numérico`})
        }

        products=products.slice(0, limit)

    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({products});
})


router.get("/:id", async (req,res) =>{
    let {id} = req.params
    id=Number(id)

    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser numérico`})
    }

    try{
        let products = await ProductsManager.getProducts();

        let product = products.find(p => p.id === id);
        if(!product){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existen el producto con id ${id}`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({product});
    }
    catch(error){
        logError(res,error)
    }
})


router.post("/", async(req,res) =>{
    let {id, title, description, code, price, status, stock, category, thumbnails } = req.body

    if(id){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No es necesario la id, se genera autamaticamente`})
    }

    const checkValues = [
        { name: 'title', value: title },
        { name: 'description', value: description },
        { name: 'code', value: code },
        { name: 'price', value: price },
        { name: 'status', value: status },
        { name: 'stock', value: stock },
        { name: 'category', value: category }
    ];

    for (const { name, value } of checkValues) {
        if (!value) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `${name} es requerido` });
        }
       
    }

    try{
        let products = await ProductsManager.getProducts()
        let exists = products.find(p => p.title.toLowerCase() === title.trim().toLowerCase())

        if(exists){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe ${title} en la base de datos`})
        }
        
        let newProducts = await ProductsManager.insertProduct({title, description, code, price, status, stock, category, thumbnails})    
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({newProducts});
    }
    catch(error){
        logError(res,error)
    }
})


router.put("/:id", async (req,res) =>{
    let {id}=req.params
    id=Number(id)

    let {title, description, code, price, status, stock, category, thumbnails } = req.body

    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser valido`})
    }

    let product = (await ProductsManager.getProducts()).find(p => p.id === id);

    if(!product){
        res.setHeader('Content-Type','application/json');
        return res.status(404).json({error:`No existen el producto con id ${id}`})
    }

    try{
        const productUpdate = {
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        let products = await ProductsManager.updateProduct(productUpdate);

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({products});
    }
    catch(error){
        logError(res,error)
    }
})


router.delete("/:id", async (req,res) =>{
    let {id}=req.params
    id=Number(id)

    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser numérico`})
    }

    try{
        
        let products = await ProductsManager.getProducts()
        
        if(!products.find(p => p.id === id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El produto no existe`})
        }
        
        await ProductsManager.deleteProduct(id)
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:`Se elimino el producto ${id}`});
    }
    catch(error){
        logError(res,error)
    }

})

/*

app.get("/ds", async(req, res)=>{
    // let personajes=JSON.parse(fs.readFileSync("./src/data/demonSlayer.json", {encoding:"utf-8"}))
    let personajes=await demonManager.getPersonajes()

    let {limit, skip}=req.query
    let respuesta=personajes
    if(!limit){
        limit=personajes.length
    }else{
        limit=Number(limit)
        if(isNaN(limit)){
            return res.send(`limit debe ser numérico`)
        }
    }
    if(!skip){
        skip=0
    }else{
        skip=Number(skip)
        if(isNaN(skip)){
            return res.send(`skip debe ser numérico`)
        }
    }

    // [].sli
    respuesta=respuesta.slice(skip, limit+skip)

    res.send(respuesta)
})
*/