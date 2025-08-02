const Ticket = require("../models/ticket.model");
const User = require("../models/User");
const Client = require("../models/Client");
const { default: mongoose } = require("mongoose");

// GET /api/tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("requestedBy", "name email role")
            .populate("assignedTo", "name email role")
            .populate("client", "name email");

        res.status(200).json({
            success: true,
            message: "Tickets fetched successfully",
            data: tickets,
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching tickets",
            error: error.message,
        });
    }
};

// POST /api/tickets
// POST /api/tickets
exports.createTicket = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            category,
            client,
            requestedBy,
            assignedTo,
            slaDueDate,
            attachments,
        } = req.body;

        // ✅ 1. Validate required fields
        if (!title || !client || !requestedBy) {
            return res.status(400).json({
                success: false,
                message: "Title, client, and requestedBy are required",
            });
        }

        // ✅ 2. Validate ObjectIds
        if (
            !mongoose.Types.ObjectId.isValid(client) ||
            !mongoose.Types.ObjectId.isValid(requestedBy) ||
            (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo))
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more provided IDs are invalid",
            });
        }
        console.log("client", client);
        console.log("requestedBy", requestedBy);

        // ✅ 3. Fetch related documents
        // ✅ 3. Fetch related documents
        const [clientObj, requestedByUser, assignedToUser] = await Promise.all([
            Client.findById(client),
            User.findById(requestedBy), // ✅ Pass ID directly
            assignedTo ? User.findById(assignedTo) : null,
        ]);

        if (!clientObj) {
            return res.status(400).json({ success: false, message: "Client not found" });
        }

        console.log("requestedByUser", requestedByUser);

        if (!requestedByUser) {
            return res.status(400).json({ success: false, message: "Requested user not found" });
        }

        if (assignedTo && !assignedToUser) {
            return res.status(400).json({ success: false, message: "Assigned user not found" });
        }

        // ✅ 4. Create Ticket
        const ticket = new Ticket({
            title,
            description,
            status,
            priority,
            category,
            client: clientObj._id,
            requestedBy: requestedByUser._id,
            assignedTo: assignedToUser ? assignedToUser._id : null,
            slaDueDate,
            attachments,
        });

        await ticket.save();

        // ✅ 5. Populate response
        const populatedTicket = await Ticket.findById(ticket._id)
            .populate("requestedBy", "name email employeeId")
            .populate("assignedTo", "name email employeeId")
            .populate("client", "name email clientId");

        res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            data: populatedTicket,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create ticket",
            error: error.message,
        });
    }
};


// GET /api/tickets/:id
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("requestedBy", "name email")
            .populate("assignedTo", "name email")
            .populate("client", "name email");

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket fetched successfully",
            data: ticket,
        });
    } catch (error) {
        console.error("Error fetching ticket:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching ticket",
            error: error.message,
        });
    }
};

// PUT /api/tickets/:id
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("requestedBy", "name email")
            .populate("assignedTo", "name email")
            .populate("client", "name email");

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            data: ticket,
        });
    } catch (error) {
        console.error("Error updating ticket:", error);
        res.status(400).json({
            success: false,
            message: "Failed to update ticket",
            error: error.message,
        });
    }
};

// DELETE /api/tickets/:id
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Ticket deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting ticket",
            error: error.message,
        });
    }
};
