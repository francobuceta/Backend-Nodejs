import { ticketModel } from "../models/ticket.model.js";

export default class TicketManager {
    async createTicket(obj) {
        try {
            const newTicket = await ticketModel.create(obj);
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    }

    async verifyStock(id) {
        const userCart = await ticketModel.findOne()
        console.log(obj);
    }
}