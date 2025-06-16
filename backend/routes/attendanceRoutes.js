const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.get("/", async (req, res) => {
  const { date } = req.query;
  const entries = await Attendance.find(date ? { date } : {});
  res.json(entries);
});



router.post("/", async (req, res) => {
  try {
    const entry = new Attendance(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
