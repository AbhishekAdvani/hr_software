const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    name: String,
    date: { type: String, required: true },
    clockIn: String,
    clockOut: String,
    location: String,
    client: String,
    project: String,
    geoLocation: String,
  },
  { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true }); // Ensure one record per employee per day

module.exports = mongoose.model("Attendance", attendanceSchema);
