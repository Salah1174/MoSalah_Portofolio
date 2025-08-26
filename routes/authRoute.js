const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register admin user (for initial setup only)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();
    res
      .status(200)
      .send({ success: true, message: "Admin user created successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ success: false, message: "Invalid token" });
  }
};

// Verify admin route
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).send({
    success: true,
    user: {
      id: req.user.userId,
      username: req.user.username,
      role: req.user.role,
    },
  });
});

module.exports = router;
