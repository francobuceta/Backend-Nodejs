import ticketService from "../services/ticket.services.js";

class TicketController {
    createTicket = async (req, res) => {
        const { email } = req.user;
        const amount = res.locals.data;
    
        const newTicket = ticketService.createTicket(email, amount);
        return newTicket;
    }
}

export default new TicketController();
