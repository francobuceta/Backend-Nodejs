import { existsSync, promises } from 'fs';

//Clase Cart Manager
export default class CartManager {  
    constructor() {
        this.path = "./files/cart.json";
    }

    async getCartProducts() {
        try {
            if (existsSync(this.path)) {
                const products = await promises.readFile(this.path, "utf-8");
                const productsParse = JSON.parse(products);
                return productsParse;
            } else {
                return [];
            }
        } catch (error) {
            console.log("Error: No se encontro producto");
        }
    }

    async getCartProductsById(idCart) {
        
        const array = await this.getCartProducts();
        const newArray = array.find(product => product.id === idCart);
        
        if (newArray) {
            return newArray;
        } 
        
        return console.log("Error: No se encontro producto");
    }

    async addProduct(obj) {
        const { title, description, price, thumbnail, code, stock, category, status } = obj;
        let newProduct;
        let array = await this.getProducts();
        const codeProduct = array.find(prod => prod.code === code)

        if (!title || !description || !price || !thumbnail || !code || !stock || !category || status === "") {
            console.log("Error: Missing field");
        } else if (codeProduct){
            console.log("Error: Code already exists");
        } else {
            newProduct = {
                id: await this.generateId(),
                title, 
                description,
                price,
                thumbnail,
                code,
                stock,
                category,
                status
            }

            try {
                const productsFile = await this.getProducts();
                productsFile.push(newProduct);
                await promises.writeFile(this.path, JSON.stringify(productsFile));
                return true;
            } catch (error) {
                console.log("Error: No se pudo agregar producto");
            }
        }        
    }
}