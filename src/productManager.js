import { existsSync, promises } from 'fs';

//Clase Productos
export default class ProductManager {  
    constructor() {
        this.path = "./files/products.json";
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

    async addProduct(obj) {
        const { title, description, price, thumbnail, code, stock, category, status } = obj;
        let newProduct;
        let array = await this.getProducts();
        const codeProduct = array.find(prod => prod.code === code);

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
        const { title, description, price, thumbnail, code, stock, category, status } = field;
        
        if (!title || !description || !price || !thumbnail || !code || !stock || !category || status === "") {
            console.log("Error: Missing field");
        } else if (!object) {
            console.log("Error: Wrong product");
        } else {
            object = {
                id: idProduct,
                ...field
            }
            
            array[idProduct - 1] = object;
        
            try {
                await promises.writeFile(this.path, JSON.stringify(array));
                return true;
            } catch (error) {
                console.log("Error: No se pudo actualizar producto");
            }   
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


