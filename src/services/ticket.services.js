import TicketManager from "../dao/mongoManagers/ticketManager.js";

const ticketManager = new TicketManager();

class TicketService {
    constructor(dao) {
        this.dao = dao;
    }

    createTicket = async (email, amount) => {
        const code = Math.random().toString(36).substring(2, 8);
        const date = new Date();
        const purchase_datetime = date.toLocaleString();
    
        const ticket = {
            code: code,
            purchase_datetime: purchase_datetime,
            amount: amount,
            purchaser: email
        }
    
        const newTicket = await this.dao.createTicket(ticket);
        return newTicket;
    }
}

export default new TicketService(ticketManager);