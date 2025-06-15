const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true, required: true }, // HRMS ID
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    designation: { type: String },
    department: { type: String },
    location: { type: String },
    dateOfJoining: { type: Date },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Employee", employeeSchema);
