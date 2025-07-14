const Company = require("../../models/Company");

// @desc    Create a new company (for onboarding)
// @route   POST /api/v1/companies
exports.createCompany = async (req, res) => {
  try {
    const { name, code, address } = req.body;

    const existing = await Company.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Company code already exists" });
    }

    const company = new Company({ name, code, address });
    await company.save();

    res.status(201).json({ message: "Company created successfully", company });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating company", error: err.message });
  }
};

// @desc    Get all companies (admin-only)
// @route   GET /api/v1/companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching companies", error: err.message });
  }
};

// @desc    Get single company by ID
// @route   GET /api/v1/companies/:id
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching company", error: err.message });
  }
};
