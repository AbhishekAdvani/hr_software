// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  address: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
