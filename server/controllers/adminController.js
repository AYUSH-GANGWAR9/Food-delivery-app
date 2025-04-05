import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

// Test endpoint
export const testAdminEndpoint = async (req, res) => {
  console.log('Test admin endpoint called');
  res.status(200).json({ message: "Admin API is working" });
};

// Register new admin
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // Don't log sensitive info
  console.log('Registration attempt received');

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin registration failed: email already exists');
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    console.log('Creating new admin account');
    const admin = new Admin({
      name,
      email,
      password
    });

    await admin.save();
    console.log('Admin account created successfully');

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token
    });
  } catch (error) {
    console.error("Error registering admin");
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Don't log sensitive info
  console.log('Login attempt received');

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Login failed: invalid credentials');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    console.log('Verifying credentials');
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: invalid credentials');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('Login successful');

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token
    });
  } catch (error) {
    console.error("Error during login");
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

// Get admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}; 