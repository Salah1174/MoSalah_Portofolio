import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary ">
      <div className="flex gap-5 text-6xl sm:text-3xl">
        <h1 className="text-secondary animate-fade">M</h1>
        <h1 className="text-white animate-fade delay-150">S</h1>
        <h1 className="text-tertiary animate-fade delay-300">F</h1>
      </div>
    </div>
  );
}

export default Loader;
