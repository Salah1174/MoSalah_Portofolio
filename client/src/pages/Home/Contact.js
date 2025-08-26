import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function Contact() {
  const dispatch = useDispatch();
  const portofolioData = useSelector((state) => state.root.portofolioData);
  const { contact = {} } = portofolioData || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/contact/send-message", formData);

      if (response.data.success) {
        setFormStatus({
          type: "success",
          message: response.data.message,
        });
        setFormData({ name: "", email: "", message: "" });
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setFormStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setFormStatus({ type: "", message: "" });
    }, 5000);
  };

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-3xl"></div>

      <SectionTitle title="Get In Touch" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Information */}
        <div className="space-y-8">
          {/* Header with gradient */}
          <div className="text-center lg:text-left">
            <h3 className="text-white text-3xl font-bold mb-4 bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Ready to bring your ideas to life? I'd love to hear from you and
              discuss how we can work together.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid gap-6">
            {contact.email && (
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-700 hover:border-secondary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-secondary/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-mail-line text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-white text-lg font-medium hover:text-secondary transition-colors duration-200"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {contact.country && (
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-700 hover:border-secondary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-secondary/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-map-pin-line text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-white text-lg font-medium">
                      {contact.country}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {contact.mobile && (
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-700 hover:border-secondary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-secondary/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-phone-line text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.mobile}`}
                      className="text-white text-lg font-medium hover:text-secondary transition-colors duration-200"
                    >
                      {contact.mobile}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Animation with better styling */}
          <div className="relative">
            <div className="h-[300px] mt-8 rounded-2xl overflow-hidden">
              <DotLottieReact
                src="https://lottie.host/7de3e8a1-4fc5-4443-ba63-819ab18d20ae/kDpEyYtUtM.lottie"
                loop
                autoplay
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl pointer-events-none"></div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative">
          {/* Form container with glassmorphism effect */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#2a2a2a]/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -z-10"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-white text-3xl font-bold mb-2 bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
                  Send Message
                </h3>
                <p className="text-gray-400">Let's start a conversation</p>
              </div>

              {/* Status Message with better styling */}
              {formStatus.message && (
                <div
                  className={`mb-8 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                    formStatus.type === "success"
                      ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-200 shadow-lg shadow-emerald-500/20"
                      : "bg-red-900/30 border-red-500/50 text-red-200 shadow-lg shadow-red-500/20"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i
                      className={`text-xl ${
                        formStatus.type === "success"
                          ? "ri-checkbox-circle-line"
                          : "ri-error-warning-line"
                      }`}
                    ></i>
                    <span className="font-medium">{formStatus.message}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-[#2a2a2a]/70 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary/50 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500 backdrop-blur-sm"
                        placeholder="Enter your full name"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-[#2a2a2a]/70 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary/50 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500 backdrop-blur-sm"
                        placeholder="Enter your email address"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-6 py-4 bg-[#2a2a2a]/70 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary/50 text-white placeholder-gray-400 resize-none transition-all duration-300 hover:border-gray-500 backdrop-blur-sm"
                        placeholder="Write your message here..."
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced submit button */}
                <button
                  type="submit"
                  className="relative w-full bg-gradient-to-r from-secondary to-blue-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary/30 transform hover:-translate-y-1 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <i className="ri-send-plane-line group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>

              {/* Enhanced alternative contact methods */}
              <div className="mt-10 pt-8 border-t border-gray-600/30">
                <p className="text-gray-400 text-center mb-6 text-lg font-medium">
                  Or connect with me directly
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-secondary hover:text-white border border-gray-600/50 rounded-full hover:border-secondary/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-secondary/20"
                    >
                      <i className="ri-mail-line text-lg"></i>
                      <span className="font-medium">Email</span>
                    </a>
                  )}
                  {contact.mobile && (
                    <a
                      href={`tel:${contact.mobile}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-secondary hover:text-white border border-gray-600/50 rounded-full hover:border-secondary/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-secondary/20"
                    >
                      <i className="ri-phone-line text-lg"></i>
                      <span className="font-medium">Call</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
