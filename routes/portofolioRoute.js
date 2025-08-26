const router = require("express").Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/portofolioModel");

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

module.exports = router;
