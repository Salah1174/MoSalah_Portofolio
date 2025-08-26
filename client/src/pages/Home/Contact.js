import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector } from "react-redux";
function Contact() {
  const portofolioData = useSelector((state) => state.root.portofolioData);
  const { contact = {} } = portofolioData || {};
  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-white text-sm">{"{"}</h1>
          {Object.keys(contact)
            .filter((key) => key !== "_id")
            .map((key, idx, arr) => (
              <p key={key} className="ml-5 text-sm">
                <span className="text-white text-sm">{key}</span>:
                <span className="text-white">{contact[key]}</span>
                {idx < arr.length - 1 ? "," : ""}
              </p>
            ))}
          <p className="text-white text-sm">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <DotLottieReact
            src="https://lottie.host/7de3e8a1-4fc5-4443-ba63-819ab18d20ae/kDpEyYtUtM.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
