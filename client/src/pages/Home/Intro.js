import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const portofolioData = useSelector((state) => state.root.portofolioData);
  const { intro } = portofolioData;
  const { welcomeText, firstName, lastName, caption, description } = intro;

  // Function to handle Get Started button click
  const handleGetStarted = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="relative h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      <h1 className="text-white">{welcomeText}</h1>
      <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
        {firstName || ""} {lastName || ""}
      </h1>
      <h1 className="text-7xl sm:text-3xl text-white font-semibold">
        {caption || ""}
      </h1>
      <p className="text-white w-2/3">{description || ""} </p>

      {/* Enhanced button section with multiple actions */}
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Primary Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="group relative bg-gradient-to-r from-secondary to-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-blue-600 hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary/30 transform hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>Get Started</span>
            <i className="ri-arrow-down-line group-hover:translate-y-1 transition-transform duration-300"></i>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* View Projects Button */}
        <button
          onClick={scrollToProjects}
          className="group border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 transform hover:-translate-y-1"
        >
          <span className="flex items-center space-x-2">
            <span>View Projects</span>
            <i className="ri-folder-line group-hover:rotate-12 transition-transform duration-300"></i>
          </span>
        </button>

        {/* Contact Me Button */}
        <button
          onClick={scrollToContact}
          className="group border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        >
          <span className="flex items-center space-x-2">
            <span>Contact Me</span>
            <i className="ri-mail-line group-hover:scale-110 transition-transform duration-300"></i>
          </span>
        </button>
      </div>

      {/* Social links or additional info */}
      <div className="flex items-center space-x-4 mt-6">
        <div className="h-px bg-gray-600 w-16"></div>
        <p className="text-gray-400 text-sm">Scroll down to explore</p>
        <div className="h-px bg-gray-600 w-16"></div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={handleGetStarted}
          className="text-white hover:text-secondary transition-colors duration-300"
        >
          <i className="ri-arrow-down-double-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Intro;
