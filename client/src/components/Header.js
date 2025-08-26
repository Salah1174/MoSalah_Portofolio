import React from "react";

function Header() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-5 bg-primary flex justify-between items-center">
      <div className="flex space-x-2">
        <h1 className="text-secondary text-4xl font-semibold">M</h1>
        <h1 className="text-secondary text-4xl font-semibold">S</h1>
        <h1 className="text-secondary text-4xl font-semibold">F</h1>
      </div>

      <nav className="hidden md:flex space-x-8">
        <button
          onClick={() => scrollToSection("home")}
          className="text-white hover:text-secondary transition-colors duration-200 font-medium"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="text-white hover:text-secondary transition-colors duration-200 font-medium"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("experience")}
          className="text-white hover:text-secondary transition-colors duration-200 font-medium"
        >
          Experience
        </button>
        <button
          onClick={() => scrollToSection("projects")}
          className="text-white hover:text-secondary transition-colors duration-200 font-medium"
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="text-white hover:text-secondary transition-colors duration-200 font-medium"
        >
          Contact
        </button>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-white">
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
