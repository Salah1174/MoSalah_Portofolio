const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const portofolioRoute = require("./routes/portofolioRoute");
app.use(express.json());
app.use("/api/portofolio", portofolioRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running On ${port}`);
});
