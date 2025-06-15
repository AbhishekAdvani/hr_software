const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    name: String,
    date: { type: String, required: true },

    clockIn: String,
    clockOut: String,
    location: String,
    geoLocation: String,

    // Support multiple clients/projects/tasks in one day
    workLogs: [
      {
        client: { type: String, required: true },
        project: { type: String },
        tasks: { type: [String], default: [] },
        hoursWorked: { type: Number }, // Optional: if you want to log per-client time
      },
    ],
  },
  { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
