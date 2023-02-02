import { existsSync, promises } from 'fs';

//Clase Cart Manager
export default class CartManager {  
    constructor() {
        this.path = "./files/cart.json";
    }

    async getCart() {
        try {
            if (existsSync(this.path)) {
                const cart = await promises.readFile(this.path, "utf-8");
                const cartParse = JSON.parse(cart);
                return cartParse;
            } else {
                return [];
            }
        } catch (error) {
            console.log("Error: No se encontro carrito");
        }
    }

    async generateId() {
        let id = 1;

        try {
            let idCart = await this.getCart();

            if (idCart.length !== 0) {
                id = idCart[idCart.length - 1].id + 1;
            }
        } catch (error) {
            console.log("Error: No se pudo generar Id");
        }
        
        return id;
    }

    async getCartById(idCart) {
        
        const array = await this.getCart();
        const newArray = array.find(cart => cart.id === idCart);
        
        if (newArray) {
            return newArray;
        } 
        
        return console.log("Error: No se encontro el carrito");
    }

    async createCart() {
        const cart = {
            id: await this.generateId(),
            products: [],
        }

        try {
            if (existsSync(this.path)) {
                let array = await this.getCart();
                array.push(cart);
                await promises.writeFile(this.path, JSON.stringify(array));
            } else {
                let cartArray = [];
                cartArray.push(cart);
                await promises.writeFile(this.path, JSON.stringify(cartArray));
            }
        } catch (error) {
            console.log("No se pudo crear el carrito");
        }
    }

    async addProductToCart(idCart, idProduct) {
        let cartId = await this.getCartById(idCart);
        let array = await this.getCart();
        let newProduct;
        let arrayProducts = cartId.products.find(elem => elem.product === idProduct);

        if (idCart < 1 || idCart > array.length) {
            console.log("Error: Invalid data");
        } else if (arrayProducts) { 
            const productIndex = cartId.products.findIndex(elem => elem.product === idProduct);
            
            arrayProducts = {
                product: idProduct,
                quantity: arrayProducts.quantity + 1
            };
            
            array[idCart - 1].products[productIndex] = arrayProducts;
            await promises.writeFile(this.path, JSON.stringify(array));
        } else {
            newProduct = {
                product: idProduct,
                quantity: 1
            }

            try {
                cartId.products.push(newProduct);
                array[idCart - 1] = cartId;
                await promises.writeFile(this.path, JSON.stringify(array));
            } catch (error) {
                console.log("Error: No se pudo agregar el producto al carrito");
            }
        }
    }
}

//Instancia
const cart = new CartManager();

//cart.createCart();
//cart.getCartById(2);
//cart.addProductToCart(2, 3);