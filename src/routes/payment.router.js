import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";
import { discountStock, sendEmail } from "../dao/middlewares/middlewares.js";
import ticketController from "../controllers/ticket.controller.js";
import passport from "passport";

class PaymentRouter {
    constructor() {
        this.router = Router();
        this.router.post("/:cid/payment-intents", passport.authenticate("jwt", { session: false }), paymentController.createPayment);
        this.router.post("/:cid/payment-confirmation", passport.authenticate("jwt", { session: false }), discountStock/* , sendEmail, ticketController.createTicket */);
    }

    getRouter() {
        return this.router;
    }
}

export default new PaymentRouter();