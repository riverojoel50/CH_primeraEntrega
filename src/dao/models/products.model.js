import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

const productsEsquema = new mongoose.Schema(
    {
        title: String, 
        description: String,
        code: String, 
        price: Number, 
        status: Boolean,
        stock: Number,
        category: String
    },
    { collection: 'products' }
)

productsEsquema.plugin(paginate)

export const productsModel = mongoose.model('product', productsEsquema)
