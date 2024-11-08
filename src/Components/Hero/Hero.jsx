import React from "react";
import HeroPng from "../../assets/hero.png";
import {developer} from "../../assets/index.js"
import { BiPlayCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { moksha } from "../../assets/index.js";

const Hero = ({ togglePlay }) => {
  return (
    <>
      <div className="py-12 sm:py-0 dark:bg-black dark:text-white duration-300 overflow-hidden">
        <div className="container min-h-[700px] flex relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
            {/* hero text section */}
            <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative z-30">
              <h1 data-aos="fade-up" data className="text-4xl font-semibold">
              Discover the {" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Innovation at NSUT Hackathon
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="300">
              NSUT Hackathon Awaits: Let Our Bot Reserve Your Place!
              </p>
              <div className="flex gap-6">
                <Link to="/chatbot">
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="primary-btn"
                >

                  Chat with S.A.M
                </button>
                </Link>
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"    
                  className="flex items-center gap-2"
                >
                  {" "}
                  <BiPlayCircle className="text-3xl" />
                  See Demo
                </button>
              </div>
            </div>
            {/* image section */}
            <div
              data-aos="fade-up"
              data-aos-offset="0"
              className="order-1 sm:order-2"
            >
              <img src={moksha} alt="" className="w-120 h-60 rounded-2xl" />
            </div>
          </div>

          {/* Animated Blob */}
          <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
