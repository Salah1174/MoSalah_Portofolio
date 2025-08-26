const { Intro, About, Experience, Project, Contact } = require("../models/portofolioModel");
const ContactMessage = require("../models/contactMessageModel");

// Home page controller
const getHomePage = async (req, res) => {
  try {
    const intro = await Intro.findOne();
    const about = await About.findOne();
    res.render("index", { 
      title: "Mohamed Salah - Portfolio",
      intro: intro || {},
      about: about || {}
    });
  } catch (error) {
    console.error("Home page error:", error);
    res.status(500).render("index", { 
      title: "Mohamed Salah - Portfolio",
      intro: {},
      about: {}
    });
  }
};

// About page controller
const getAboutPage = async (req, res) => {
  try {
    const about = await About.findOne();
    const experiences = await Experience.find();
    res.render("about", { 
      title: "About - Mohamed Salah",
      about: about || {},
      experiences: experiences || []
    });
  } catch (error) {
    console.error("About page error:", error);
    res.status(500).render("about", { 
      title: "About - Mohamed Salah",
      about: {},
      experiences: []
    });
  }
};

// Projects page controller
const getProjectsPage = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render("projects", { 
      title: "Projects - Mohamed Salah",
      projects: projects || []
    });
  } catch (error) {
    console.error("Projects page error:", error);
    res.status(500).render("projects", { 
      title: "Projects - Mohamed Salah",
      projects: []
    });
  }
};

// Contact page controller
const getContactPage = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.render("contact", { 
      title: "Contact - Mohamed Salah",
      contact: contact || {}
    });
  } catch (error) {
    console.error("Contact page error:", error);
    res.status(500).render("contact", { 
      title: "Contact - Mohamed Salah",
      contact: {}
    });
  }
};

// Handle contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Save message to database
    const contactMessage = new ContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });
    
    await contactMessage.save();

    res.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon."
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again."
    });
  }
};

// Get portfolio data (API endpoint)
const getPortfolioData = async (req, res) => {
  try {
    const intro = await Intro.findOne();
    const about = await About.findOne();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const contact = await Contact.findOne();

    res.json({
      success: true,
      data: {
        intro: intro || {},
        about: about || {},
        experiences: experiences || [],
        projects: projects || [],
        contact: contact || {}
      }
    });
  } catch (error) {
    console.error("Get portfolio data error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio data"
    });
  }
};

module.exports = {
  getHomePage,
  getAboutPage,
  getProjectsPage,
  getContactPage,
  submitContactForm,
  getPortfolioData
};
