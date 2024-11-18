import { productsModel } from "./models/products.model.js";
import { mongoose } from "mongoose";

export class ProductsDAO{
    static async getProducts(page=1, limit=10, category = null, status = null, sort = null, pid = null){
        const filter = {};
        if (category) filter.category = category; 
        if (status !== null) filter.status = status === "true"
        //if (pid) filter._id=  mongoose.Types.ObjectId(pid);

        const sortOption = {};
        if (sort) sortOption.price = sort === "asc" ? 1 : -1;   


        return await productsModel.paginate(filter, {limit, page, sort:sortOption, lean:true})
    }
}