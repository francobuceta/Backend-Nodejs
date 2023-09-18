import PaymentService from "../services/payment.services.js";

class PaymentController {
    createPayment = async (req, res, next) => {
        console.log("hola");
        const { id } = req.query;
        try {
            const response = await PaymentService.createPaymentStripe(id); //El profe pasa el id a numero
            res.json({ message: "Pago realizado con éxito", payload: response });
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default new PaymentController();