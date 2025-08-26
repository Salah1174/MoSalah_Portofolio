import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector } from "react-redux";
function About() {
  const portofolioData = useSelector((state) => state.root.portofolioData);
  const { about } = portofolioData || {};
  const { description1, description2, skills = [], lottieURL } = about;

  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-1/2 sm:w-full">
          <DotLottieReact src={lottieURL} loop autoplay />
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{description1 || ""}</p>
          <p className="text-white">{description2 || ""}</p>
        </div>
      </div>
      <div>
        <h1 className="text-tertiary text-xl">
          Here are a few techonologies i've been working with recently:
        </h1>
        <div className="flex flex-wrap text-xl text-tertiary gap-10 mt-5">
          {skills.map((skill, index) => (
            <div className="border border-tertiary py-3 px-5 rounded">
              <h1>{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
