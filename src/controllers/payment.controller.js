import PaymentService from "../services/payment.services.js";

class PaymentController {
    createPayment = async (req, res) => {
        const purchaseData = req.body.purchaseInfo;
        try {
            const response = await PaymentService.createPaymentStripe(purchaseData);
            res.json({ message: "Pago realizado con éxito", payload: response });
        } catch (error) {
            throw error;
        }
    }
}

export default new PaymentController();