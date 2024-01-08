import PaymentService from "../services/payment.services.js";

class PaymentController {
    createPayment = async (req, res, next) => {
        const purchaseData = req.headers['Purchase-Info'];
        try {
            const response = await PaymentService.createPaymentStripe(JSON.parse(purchaseData));
            res.json({ message: "Pago realizado con éxito", payload: response });
            next();
        } catch (error) {
            throw error;
        }
    }
}

export default new PaymentController();