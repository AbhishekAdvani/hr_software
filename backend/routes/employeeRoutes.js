const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.post("/", async (req, res) => {
  const { id, name } = req.body;
  const emp = new Employee({ id, name });
  await emp.save();
  res.status(201).send(emp);
});

module.exports = router;
