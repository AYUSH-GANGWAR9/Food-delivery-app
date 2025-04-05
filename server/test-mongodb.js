import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/adminModel.js';

// Load environment variables
dotenv.config();

console.log('Starting MongoDB connection test');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    testAdmin();
  })
  .catch(err => {
    console.error('MongoDB Connection Error');
    process.exit(1);
  });

// Test creating an admin user
async function testAdmin() {
  try {
    // Check if test admin exists
    const existingAdmin = await Admin.findOne({ email: 'test@example.com' });
    
    if (existingAdmin) {
      console.log('Test admin account exists');
    } else {
      // Create a test admin
      const admin = new Admin({
        name: 'Test Admin',
        email: 'test@example.com',
        password: 'password123'
      });

      await admin.save();
      console.log('Test admin account created successfully');
    }
    
    // List all admins (safely)
    const adminCount = await Admin.countDocuments({});
    console.log(`Total admin accounts: ${adminCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing admin functionality');
    process.exit(1);
  }
} 