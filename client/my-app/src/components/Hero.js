import React from "react";
import pav from "../images/cooking.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight xl:text-6xl mb-6">
              Taste the World, One Recipe at a Time
            </h1>
            <p className="text-lg text-gray-500 lg:text-xl mb-8">
              A community where every dish has a story to tell.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-black  rounded-lg"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                onClick={() => navigate("/recipes")}
              >
                Go to Recipes Page
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="flex items-center justify-center">
            <img
              src={pav}
              alt="Cooking Illustration"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;