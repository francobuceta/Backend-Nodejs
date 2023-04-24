import { createTicketService, verifyStockService } from "../services/ticket.services.js";

export const createTicketController = async (req, res) => {
    const { cid } = req.params; 
    const newTicket = createTicketService(cid);
    return newTicket;
}

export const verifyStockController = async (req, res, next) => {
    console.log(req.user); 
    next();
}