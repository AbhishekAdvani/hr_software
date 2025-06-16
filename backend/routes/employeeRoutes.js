const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const employeeController = require("../controllers/employeeController");

router.get("/getAllEmployees", employeeController.getAllEmployees);

router.post("/createEmployee", employeeController.createEmployee);

router.get("/getEmployeeById/:id", employeeController.getEmployeeById);
router.put("/updateEmployee/:id", employeeController.updateEmployee);
router.delete("/deleteEmployee/:id", employeeController.deleteEmployee);

router.post(
  "/upload-excel",
  upload.single("file"),
  employeeController.uploadEmployeesFromExcel
);
router.delete("/delete-all", employeeController.deleteAllEmployees);

module.exports = router;
