const mongoose = require("mongoose");
const Counter = require("./Counter");

const ticketSchema = new mongoose.Schema(
    {
        ticketId: { type: Number, unique: true },         // Auto-incrementing number
        ticketCode: { type: String, unique: true },       // Formatted: ET-TKT-1
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: ["Open", "In Progress", "On Hold", "Resolved", "Closed"],
            default: "Open",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Urgent"],
            default: "Medium",
        },
        category: { type: String },
        client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
        requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        slaDueDate: { type: Date },
        attachments: [{ type: String }],
    },
    { timestamps: true }
);

// 🔁 Auto-increment and format ticketCode
ticketSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: "ticketId" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.ticketId = counter.seq;
            this.ticketCode = `ET-TKT-${counter.seq}`;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model("Ticket", ticketSchema);
