// 📁 backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const employeeData = require("./seed_employees.json");
const clientData = require("./seed_clients.json");

// DB Connection
mongoose.connect(
  `mongodb+srv://abhishekadvani:Ql3Og4x0DJ8H9aOV@cluster0.acqorqm.mongodb.net/?retryWrites=true&w=majority
`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Models
const Employee = require("./models/Employee");
const Client = require("./models/Client");
const Attendance = require("./models/Attendance");
const authRoutes = require("./routes/v1/authRoutes");
const companyRoutes = require("./routes/v1/companyRoutes");

// Routes
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/companies", companyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
