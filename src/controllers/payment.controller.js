import PaymentService from "../services/payment.services.js";

class PaymentController {
    createPayment = async (req, res, next) => {
        const purchaseData = req.body.purchaseInfo;
        try {
            const response = await PaymentService.createPaymentStripe(purchaseData);
            res.json({ message: "Pago realizado con éxito", payload: response });

            //Guardamos el total en locals.data para que lo reciba el ticket controller.
            res.locals.data = purchaseData.amount;
            next();
        } catch (error) {
            throw error;
        }
    }
}

export default new PaymentController();