const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const portofolioRoute = require("./routes/portofolioRoute");
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");

// EJS setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/portofolio", portofolioRoute);
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);

// EJS routes
const ejsRoutes = require("./routes/ejsRoutes");
app.use("/", ejsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running On ${port}`);
});
