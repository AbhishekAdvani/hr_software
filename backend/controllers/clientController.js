const Client = require("../models/Client");

// CREATE
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findOne({ clientId: clientId.toString() });
    if (!client) return res.status(404).json({ error: "Not found" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/clients
exports.deleteAllClients = async (req, res) => {
  try {
    console.log("Deleting all clients...");
    const result = await Client.deleteMany({});
    res.status(200).json({
      success: true,
      message: `All clients deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("Error deleting all clients:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting all clients",
      error: err.message,
    });
  }
};
