const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

router.post("/", async (req, res) => {
  const { id, name } = req.body;
  const client = new Client({ id, name });
  await client.save();
  res.status(201).send(client);
});

module.exports = router;
