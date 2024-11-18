import { cartsModel } from "./models/carts.model.js";
import { Model, mongoose } from "mongoose";



export class CartsDAO{
    static async getCarts(cid){
        const filter = {};
        if (cid) filter._id = cid; 
        return await cartsModel.find(filter);
    }

    static async getCartsPopulate(cid){
        const filter = {};
        if (cid) filter._id = cid; 
        return await cartsModel.find(filter).populate("products.productId");
    }

    static async updateCarts(cid, products){

        let cart = await this.getCarts(cid)

        cart[0].products = products
        await cart[0].save();

        return cart[0]
    }

    static async insertCarts(pid, quantity){

        let cart = new cartsModel({
            products: [{
              productId: pid,
              quantity: quantity,
            }],
          });

        await cart.save()
        return cart;
    }

    static async newItemCarts(cid, pid, quantity){
        let cart = await this.getCarts(cid)

        let newProduct = {
              productId: pid,
              quantity: quantity
          };


        cart[0].products.push(newProduct)  

        await cart[0].save();

        return cart[0]
    }


    static async removeItemCarts(cid,pid){
        let cart = await cartsModel.updateOne(
            { _id: cid },  
            { $pull: { products: { productId: pid } } } 
        );

        return cart
    }


    static async deleteCarts(cid){
        await cartsModel.findByIdAndDelete(cid);
    }



}