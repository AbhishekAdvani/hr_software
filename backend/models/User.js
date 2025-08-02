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
    enum: ["SuperAdmin", "HR", "Manager", "Employee", "Finance"],
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

const User = mongoose.model("User", userSchema);
module.exports = User;
