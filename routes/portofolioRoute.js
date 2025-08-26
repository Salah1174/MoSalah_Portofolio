const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/portofolioModel");

// Authentication middleware
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

// Get portfolio data
router.get("/get-portofolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      experiences,
      projects,
      contact: contacts[0],
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

// Update intro
router.put("/update-intro", verifyToken, async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).send({ success: true, intro });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Update about
router.put("/update-about", verifyToken, async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).send({ success: true, about });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Add experience
router.post("/add-experience", verifyToken, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({ success: true, experience });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Update experience
router.put("/update-experience/:id", verifyToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({ success: true, experience });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Delete experience
router.delete("/delete-experience/:id", verifyToken, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Add project
router.post("/add-project", verifyToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({ success: true, project });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Update project
router.put("/update-project/:id", verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, project });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Delete project
router.delete("/delete-project/:id", verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Update contact
router.put("/update-contact", verifyToken, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).send({ success: true, contact });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

module.exports = router;
