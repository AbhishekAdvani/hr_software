const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const userController = require("../../controllers/auth/userController");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");

// 🔐 AUTH ROUTES
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// 🔒 PROTECTED ROUTES (Require JWT)
router.use(authMiddleware.protect);

// 👤 USER CRUD ROUTES (Protected)
router.get(
  "/users",
  roleMiddleware(["SuperAdmin", "HR"]),
  userController.getAllUsers
);
router.get(
  "/users/:id",
  roleMiddleware(["SuperAdmin", "HR"]),
  userController.getUserById
);
router.post(
  "/users",
  roleMiddleware(["SuperAdmin", "HR"]),
  userController.createUser
);
router.put(
  "/users/:id",
  roleMiddleware(["SuperAdmin", "HR"]),
  userController.updateUser
);
router.delete(
  "/users/:id",
  roleMiddleware(["SuperAdmin"]),
  userController.deleteUser
);

module.exports = router;
