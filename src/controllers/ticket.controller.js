import { createTicketService } from "../services/ticket.services.js";

export const createTicketController = async (req, res) => {
    const { email } = req.user;
    const amount = res.locals.data;

    const newTicket = createTicketService(email, amount);
    return newTicket;
}
