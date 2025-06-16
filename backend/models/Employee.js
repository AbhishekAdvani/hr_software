const mongoose = require("mongoose");
const Counter = require("./Counter");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true }, // HRMS ID
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

employeeSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.employeeId) return next(); // Skip if already set

  try {
    const lastEmployee = await mongoose
      .model("Employee")
      .findOne({})
      .sort({ employeeId: -1 }) // newest first
      .select("employeeId");

    console.log("Last Employee:", lastEmployee);
    let newIdNum = 1;

    if (lastEmployee && lastEmployee.employeeId) {
      const lastNum = parseInt(lastEmployee.employeeId.replace("EMP", ""));
      newIdNum = lastNum + 1;
    }

    doc.employeeId = `EMP${String(newIdNum).padStart(3, "0")}`;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
