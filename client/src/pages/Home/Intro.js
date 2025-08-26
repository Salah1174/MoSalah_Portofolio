import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const portofolioData = useSelector((state) => state.root.portofolioData);
  const { intro } = portofolioData;
  const { welcomeText, firstName, lastName, caption, description } = intro;
  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      <h1 className="text-white">{welcomeText}</h1>
      <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
        {firstName || ""} {lastName || ""}
      </h1>
      <h1 className="text-7xl sm:text-3xl text-white font-semibold">
        {caption || ""}
      </h1>
      <p className="text-white w-2/3">{description || ""} </p>
      <button className="border-2 border-tertiary text-white rounded px-10 py-2">
        Get Started
      </button>
    </div>
  );
}

export default Intro;
