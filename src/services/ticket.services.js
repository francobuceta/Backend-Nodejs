import TicketManager from "../dao/mongoManagers/ticketManager.js";

const ticketManager = new TicketManager();

export const createTicketService = async (obj) => {
    const newTicket = await ticketManager.createTicket(obj);
    return newTicket;
}

export const verifyStockService = async (obj) => {
    const newTicket = await ticketManager.verifyStock(obj);
    return newTicket;
}