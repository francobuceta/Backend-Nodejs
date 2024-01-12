import ticketService from "../services/ticket.services.js";

class TicketController {
    createTicket = async (req, res) => {
        const { email } = req.user;
        const purchaseData = req.body.purchaseInfo;

        try {
            const newTicket = await ticketService.createTicket(email, purchaseData.amount);
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TicketController();
