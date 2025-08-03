const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  employeeId: { type: String, unique: true },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: [
      "SuperAdmin",         // Full access to everything
      "Admin",              // Global admin but not super admin
      "HRHead",             // Can create/manage employees, leave policy, etc.
      "HRExecutive",        // Can view and manage leave requests, onboarding tasks
      "Manager",            // Team manager — views team leaves, approves tickets
      "TeamLead",           // Light manager — views assigned employee tickets
      "Employee",           // Default role — limited access
      "Finance",            // Access to payroll, reimbursements
      "ITAdmin",            // Full access to all tickets (assigned/unassigned)
      "ITSupport",          // Can view/update only assigned tickets
      "Auditor",            // Read-only view of HR/ticket data
    ],
    default: "Employee",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Assuming you'll create a Company model
    required: true,
  },

  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password match method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema, "employees"); // ✅ Explicit collection name
