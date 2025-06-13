const Attendance = require("../models/Attendance");

// CREATE (Mark Attendance)
exports.createAttendance = async (req, res) => {
  try {
    const { id, date } = req.body;

    const alreadyMarked = await Attendance.findOne({ id, date });
    if (alreadyMarked) {
      return res
        .status(409)
        .json({ error: "Attendance already marked for today" });
    }

    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllAttendance = async (req, res) => {
  try {
    const entries = await Attendance.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY DATE
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const entries = await Attendance.find({ date });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ENTRY
exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// PATCH /attendance/:id
router.patch("/attendance/:id", async (req, res) => {
  const { id } = req.params;
  const { clockOut } = req.body;

  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    attendance.clockOut = clockOut;
    await attendance.save();

    res.json({ message: "Clock-out time updated", attendance });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
// GET /attendance/report?period=month&employeeId=EMP001
router.get("/attendance/report", async (req, res) => {
  const { period = "month", employeeId } = req.query;

  const now = new Date();
  let start;

  if (period === "month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (period === "week") {
    const day = now.getDay();
    start = new Date(now.setDate(now.getDate() - day));
  }

  try {
    const match = {
      date: { $gte: start.toISOString().split("T")[0] },
    };
    if (employeeId) match.employeeId = employeeId;

    const report = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$employeeId",
          daysPresent: { $sum: 1 },
          records: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeInfo",
        },
      },
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
// GET /attendance/export
router.get("/attendance/export", async (req, res) => {
  try {
    const entries = await Attendance.find();

    const header =
      "EmployeeID,Name,Date,ClockIn,ClockOut,Location,Client,Project\n";
    const rows = entries.map(
      (e) =>
        `${e.employeeId},${e.name},${e.date},${e.clockIn || ""},${
          e.clockOut || ""
        },${e.location},${e.client},${e.project}`
    );

    const csv = header + rows.join("\n");

    res.setHeader("Content-disposition", "attachment; filename=attendance.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: "CSV export failed", details: err.message });
  }
});
