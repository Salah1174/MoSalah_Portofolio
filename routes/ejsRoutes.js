const router = require("express").Router();
const portfolioController = require("../controllers/portfolioController");

// Home page
router.get("/", portfolioController.getHomePage);

// About page
router.get("/about", portfolioController.getAboutPage);

// Projects page
router.get("/projects", portfolioController.getProjectsPage);

// Contact page
router.get("/contact", portfolioController.getContactPage);

// Handle contact form submission
router.post("/contact", portfolioController.submitContactForm);

// API endpoint for portfolio data
router.get("/api/portfolio-data", portfolioController.getPortfolioData);

// Admin dashboard redirect (to React app)
router.get("/admin-dashboard", (req, res) => {
  res.redirect("http://localhost:3000/admin-login");
});

module.exports = router;
