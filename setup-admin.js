const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URL ||
    "mongodb+srv://salah1174:Salah1174@mern-portfolio.7e7l9.mongodb.net/mern-portfolio"
);

// User model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({ username: "admin" });

    if (existingUser) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    // Create admin user
    const adminUser = new User({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
