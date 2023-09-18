import ProductManager from "../dao/mongoManagers/productManager.js";
import Stripe from 'stripe';
import config from "../config/config.js"

const productManager = new ProductManager();
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

class PaymentService {
    constructor(dao) {
        this.dao = dao;
    }

    createPaymentStripe = async (id) => {
        try {
            const findProduct = await this.dao.getProductById(id);
            if (!findProduct) {
                throw new Error("Producto no encontrado");
            }
            
            const stripeInfo = {
                amount: findProduct.price,
                currency: "ars",
                /* metadata: {
                    Aqui van otros datos como usuario, nombrel del producto, etc
                } */
            }

            const response = await stripe.paymentIntents.create(stripeInfo);
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new PaymentService(productManager);