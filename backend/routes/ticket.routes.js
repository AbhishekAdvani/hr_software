const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

router.get("/getAllTickets", ticketController.getAllTickets);
router.post("/createTicket", ticketController.createTicket);
router.get("/getTicketById/:id", ticketController.getTicketById);
router.patch("/updateTicket/:id", ticketController.updateTicket);
router.delete("/deleteTicket/:id", ticketController.deleteTicket);

module.exports = router;
