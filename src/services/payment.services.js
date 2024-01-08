import Stripe from 'stripe';
import config from "../config/config.js"

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

class PaymentService {
    createPaymentStripe = async (purchaseData) => {
        try {
            if (!purchaseData) {
                throw new Error("Productos no encontrados");
            }
            
            const stripeInfo = {
                amount: purchaseData.amount,
                currency: "ars",
                metadata: {
                    user: purchaseData.user,
                    orderDetails: purchaseData.products
                }
            }

            const response = await stripe.paymentIntents.create(stripeInfo);
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new PaymentService();