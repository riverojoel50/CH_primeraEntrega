import fs from "fs";

export class ProductsManager{
    static #path = ""

    static setPath(rutaArchivo = ""){
        this.#path = rutaArchivo
    }

    static async getProducts(){
        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }
    static async insertProduct(product = {}){
        let products = await this.getProducts()
        let id = 1
        if(products.length > 0){
            id = Math.max(...products.map(p => p.id)) + 1
        }

        let newProducts = {
            id, 
            ...product 
        }

        products.push(newProducts)
        await this.#saveFile(JSON.stringify(products, null, 5))

        return newProducts
    }

    static async updateProduct(product = {}){
        let products = await this.getProducts()

        products.forEach(p => {
            if(p.id === product.id){
                p.title = product.title
                p.description = product.description
                p.code = product.code
                p.price = product.price
                p.status = product.status
                p.sotck = product.sotck
                p.categoria = product.categoria
                p.thumbnails = product.thumbnails
            }
        });

        await this.#saveFile(JSON.stringify(products, null, 5))

        return products
    }

    static async deleteProduct(id){
        let products = await this.getProducts()

        const newProducts = products.find(p => p.id !== id)
        

        await this.#saveFile(JSON.stringify(newProducts, null, 5))

    }

    static async #saveFile(datos = ""){
        if(typeof datos != "string"){
            throw new Error(`error método grabaArchivo - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    }

}

