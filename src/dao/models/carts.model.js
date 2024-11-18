import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

const cartsEsquema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"products",
                        required: true
                    },
                    quantity: Number, 
                }
            ]
        }, 
    },
    { collection: 'carts' }
)

cartsEsquema.plugin(paginate)

export const cartsModel = mongoose.model('cart', cartsEsquema)
