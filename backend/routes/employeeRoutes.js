const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const employeeController = require("../controllers/employeeController");

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

router.post(
  "/upload-excel",
  upload.single("file"),
  employeeController.uploadEmployeesFromExcel
);
router.delete("/delete-all", employeeController.deleteAllEmployees);

module.exports = router;
