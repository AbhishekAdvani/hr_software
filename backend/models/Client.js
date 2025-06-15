const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientId: { type: String, unique: true, required: true }, // You define this
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    industry: { type: String }, // e.g. IT, Finance, etc.
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true } // Adds createdAt, updatedAt
);

module.exports = mongoose.model("Client", clientSchema);
