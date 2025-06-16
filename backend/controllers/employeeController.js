const Employee = require("../models/Employee");
const XLSX = require("xlsx");

const success = (res, code, message, data = {}) =>
  res.status(code).json({ success: true, code, message, data });

const error = (res, code, message) =>
  res.status(code).json({ success: false, code, message, data: null });

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    success(res, 201, "Employee created", employee);
  } catch (err) {
    console.error(err);
    error(res, 400, err.message);
  }
};

// READ ALL
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ employeeId: 1 });
    success(res, 200, "All employees fetched", employees);
  } catch (err) {
    error(res, 500, err.message);
  }
};

// READ ONE
exports.getEmployeeById = async (req, res) => {
  try {
    console.log("Fetching employee with employeeId:", req.params.id);
    const employeeId = req.params.id;
    const employee = await Employee.findOne({
      employeeId: employeeId.toString(),
    });
    if (!employee) return error(res, 404, "Employee not found");
    success(res, 200, "Employee fetched", employee);
  } catch (err) {
    error(res, 500, err.message);
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) return error(res, 404, "Employee not found");
    success(res, 200, "Employee updated", employee);
  } catch (err) {
    error(res, 400, err.message);
  }
};

// DELETE ONE
exports.deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (!result) return error(res, 404, "Employee not found");
    success(res, 200, "Employee deleted");
  } catch (err) {
    error(res, 500, err.message);
  }
};

// BULK UPLOAD via Excel
exports.uploadEmployeesFromExcel = async (req, res) => {
  try {
    if (!req.file) return error(res, 400, "No file uploaded");

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
    success(res, 201, `${employees.length} employees uploaded`, {
      count: employees.length,
    });
  } catch (err) {
    error(res, 500, "Error uploading employees: " + err.message);
  }
};

// DELETE ALL
exports.deleteAllEmployees = async (req, res) => {
  try {
    const result = await Employee.deleteMany();
    success(res, 200, "All employees deleted", {
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    error(res, 500, "Error deleting employees: " + err.message);
  }
};
