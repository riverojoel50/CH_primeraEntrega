import fs from "fs";

export class CartsManager{
    static #path = ""

    static setPath(rutaArchivo = ""){
        this.#path = rutaArchivo
    }

    static async getCarts(){
        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    static async insertCart(cid, pid){
        let carts = await this.getCarts()
        let quantity = 1

        for(let cart of carts){
            if(cart.id === cid){
                let newProduct = {
                    id: pid, 
                    quantity: quantity
                }
        
                cart.products.push(newProduct)
                break
            }
        }

        await this.#saveFile(JSON.stringify(carts, null, 5))

        return carts
    }

    static async updateCart(cid, pid){
        let carts = await this.getCarts()

        for(let cart of carts){
            if(cart.id === cid){
                for(let product of cart.products){
                    if(product.id === pid){
                        product.quantity = product.quantity + 1
                        break
                    }
                }
                break
            }
        }

        await this.#saveFile(JSON.stringify(carts, null, 5))

        return carts
    }


    static async #saveFile(datos = ""){
        if(typeof datos != "string"){
            throw new Error(`error método grabaArchivo - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    }


}