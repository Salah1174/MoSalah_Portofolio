import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./about";
import Experiencies from "./Experiencies";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
function Home() {
  return (
    <div className="bg-primary px-40 sm:px-5">
      <Header />
      <Intro />
      <About />
      <Experiencies />
      <Projects />
      <Contact />
      <Footer />
      <LeftSider />
    </div>
  );
}

export default Home;
