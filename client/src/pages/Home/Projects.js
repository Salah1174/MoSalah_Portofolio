import React from "react";
// import { projects } from "../../resources/projects";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const portofolioData = useSelector((state) => state.root.portofolioData);
  const { projects = [] } = portofolioData || {};
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);
  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#134e4c82] w-1/3 sm:flex-row sm-overflow-x-scroll sm-w-full">
          {projects.map((project, currentIndex) => (
            <div
              key={project._id}
              onClick={() => {
                setSelectedItemIndex(currentIndex);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === currentIndex
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#134e4c82] py-3"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10">
          {selectedItemIndex !== null && (
            <>
              <img
                src={projects[selectedItemIndex].image}
                alt=""
                className="h-60 w-72"
              ></img>
              <div className="flex flex-col gap-5">
                <h1 className="text-secondary text-xl">
                  {projects[selectedItemIndex].title}
                </h1>
                <a
                  href={projects[selectedItemIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary text-xl hover:text-blue-400 transition-colors duration-200"
                >
                  🔗 View Project
                </a>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedItemIndex].technologies?.map(
                    (tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-tertiary text-white rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
                <div className="text-white">
                  <p>{projects[selectedItemIndex].description}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
