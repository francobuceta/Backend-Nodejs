import { createTicketService } from "../services/ticket.services.js";

export const createTicketController = async (req, res) => {
    const { cid } = req.params; 
    const newTicket = createTicketService(cid);
    return newTicket;
}
