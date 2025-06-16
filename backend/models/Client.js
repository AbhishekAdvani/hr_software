const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientId: { type: String, unique: true }, // You define this
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    industry: { type: String }, // e.g. IT, Finance, etc.
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true } // Adds createdAt, updatedAt
);

clientSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.clientId) return next(); // Skip if already set

  try {
    const lastClient = await mongoose
      .model("Client")
      .findOne({})
      .sort({ clientId: -1 }) // newest first
      .select("clientId");

    console.log("Last Employee:", lastClient);
    let newIdNum = 1;

    if (lastClient && lastClient.clientId) {
      const lastNum = parseInt(lastClient.clientId.replace("CLI", ""));
      newIdNum = lastNum + 1;
    }

    doc.clientId = `CLI${String(newIdNum).padStart(3, "0")}`;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Client", clientSchema);
