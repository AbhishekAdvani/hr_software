const express = require("express");
const router = express.Router();
const companyController = require("../../controllers/company/companyController");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");

router.use(authMiddleware.protect);

// Only SuperAdmin can create/manage companies
router.post(
  "/",
  roleMiddleware(["SuperAdmin"]),
  companyController.createCompany
);
router.get(
  "/",
  roleMiddleware(["SuperAdmin"]),
  companyController.getAllCompanies
);
router.get(
  "/:id",
  roleMiddleware(["SuperAdmin"]),
  companyController.getCompanyById
);

module.exports = router;
