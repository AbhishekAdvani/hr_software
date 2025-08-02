const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const clientController = require("../controllers/clientController");

router.get("/getAllClients", clientController.getAllClients);
router.post("/createClient", clientController.createClient);
router.get("/getClientById/:id", clientController.getClientById);
router.get("/deleteAllClients", clientController.deleteAllClients);

module.exports = router;
