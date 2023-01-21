import { existsSync, promises } from 'fs';

//Clase
export default class ProductManager {  
    constructor() {
        this.path = "./files/file1.json";
    }

    async getProducts() {
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

    async addProduct(title, description, price, thumbnail, code, stock) {
        let newProduct;
        let array = await this.getProducts();
        const codeProduct = array.find(prod => prod.code === code)

        if (!title || !description || !price || !thumbnail || !code || !stock) {
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
                stock
            }
        }

        try {
            const productsFile = await this.getProducts();
            productsFile.push(newProduct);
            await promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log("Error: No se pudo agregar producto");
        }
    }

    async getProductById(idProduct) {
        
        const array = await this.getProducts();
        const newArray = array.find(product => product.id === idProduct);
        
        if (newArray) {
            return newArray;
        } 
        
        return console.log("Error: No se encontro producto");
    }

    async generateId() {
        let id = 1;

        try {
            let idProduct = await this.getProducts();

            if (idProduct.length !== 0) {
                id = idProduct[idProduct.length - 1].id + 1;
            }
        } catch (error) {
            console.log("Error: No se pudo generar Id");
        }
        
        return id;
    }

    async updateProduct(idProduct, field) {
        let array = await this.getProducts();
        let object = array.find(product => product.id === idProduct);
        
        object = {
            id: idProduct,
            ...field
        }
        
        const newArray = array[idProduct - 1] = object;
        console.log(newArray);

        try {
            await promises.writeFile(this.path, JSON.stringify(array));
        } catch (error) {
            console.log("Error: No se pudo actualizar producto");
        }   
    }

    async deleteProduct(idProduct) {
        let array = await this.getProducts();
    
        try {
            const newArray = array.filter(elem => elem.id !== idProduct);
            await promises.writeFile(this.path, JSON.stringify(newArray));
        } catch (error) {
            console.log("error");
        }
    }
}

//Instancia
//const product = new ProductManager();

//Testing 
async function test() {
    const consult = await product.getProducts();
    console.log(consult);
    
    await product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imágen", "abc123", 25);
    
    await product.addProduct("producto prueba2", "Este es un producto prueba", 200, "Sin imágen", "abc123", 25); 
    const consult2 = await product.getProducts();
    console.log(consult2);

    const getId = await product.getProductById(2);
    console.log(getId);
    
    const update = await product.updateProduct(1, {
                                    title:"producto actualizado", 
                                    description:"Este es un producto prueba", 
                                    price:200, 
                                    thumbnail:"Sin imágen", 
                                    code:"abc123", 
                                    stock:25
                                }) 
    console.log(update);
    
    const erase = await product.deleteProduct(2);
    console.log(erase); 
}

//test(); 


