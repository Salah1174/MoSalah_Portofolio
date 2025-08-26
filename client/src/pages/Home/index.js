import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./about";
import Experiencies from "./Experiencies";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
import { useSelector } from "react-redux";

function Home() {
  const portofolioData = useSelector((state) => state.root.portofolioData);
  return (
    <div>
      <Header />
      {portofolioData && (
        <div className="bg-primary px-40 sm:px-5">
          <div id="home">
            <Intro />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="experience">
            <Experiencies />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
          <LeftSider />
        </div>
      )}
    </div>
  );
}

export default Home;
