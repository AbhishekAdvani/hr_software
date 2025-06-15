const Employee = require("../models/Employee");
const XLSX = require("xlsx");

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 1️⃣ Bulk upload via Excel
exports.uploadEmployeesFromExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const employees = sheet.map((row) => ({
      employeeId: row.employeeId,
      name: row.name,
      email: row.email,
      phone: row.phone,
      designation: row.designation,
      department: row.department,
      location: row.location,
      dateOfJoining: new Date(row.dateOfJoining),
      status: row.status || "Active",
    }));

    await Employee.insertMany(employees);
    res
      .status(201)
      .json({ message: `${employees.length} employees uploaded.` });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading employees");
  }
};

// 2️⃣ Delete all employees
exports.deleteAllEmployees = async (req, res) => {
  try {
    await Employee.deleteMany();
    res.status(200).json({ message: "All employees deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting employees");
  }
};
