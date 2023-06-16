import ticketService from "../services/ticket.services.js";

class TicketController {
    createTicket = async (req, res) => {
        const { email } = req.user;
        const amount = res.locals.data;

        try {
            const newTicket = await ticketService.createTicket(email, amount);
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TicketController();
