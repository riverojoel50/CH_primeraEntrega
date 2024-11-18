import express from 'express'
import mongoose from 'mongoose';
import {engine} from "express-handlebars"
import { router as vistasRouter } from './routes/vistasRouter.js';
import {router as productsRouter} from './routes/products.router.js'
import {router as cartsRouter} from './routes/carts.router.js'

const PORT =8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))
app.engine("handlebars", engine({}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")
app.use("/", vistasRouter)


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


const conectarDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://jo50:Rjov2018@cluster0.93gua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {   dbName: "shopDB"
                
            })

        console.log("base de datos cnoectada")
    }
    catch(error){
        console.log("Error al conectar a la bd: " + error)
    }
}

conectarDB();