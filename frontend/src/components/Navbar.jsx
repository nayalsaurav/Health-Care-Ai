import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="py-4 bg-black sm:py-6 ">
     <div className="mx-auto max-w-[1400px]">
     <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link to="/" title="" className="flex">
              {/* <img
                className="w-auto h-9"
                 src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg"
                alt="VedaVanni"
              /> */}
              <span className="text-2xl bg-gradient-to-r from-fuchsia-300 to-yellow-300 bg-clip-text text-transparent">VedaVanni</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-10 md:flex md:items-center md:justify-center lg:space-x-12">
            
            <Link
              to="#"
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Features
            </Link>
            <Link
              to="#"
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Support
            </Link>
          <div className="relative inline-flex group">
            <div className="absolute -z-99 transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <button onClick={()=>{navigate('/signin')}}>Sign in</button>

          </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {expanded && (
          <nav>
            <div className="flex flex-col pt-8 pb-4 space-y-6">
             
              <Link
                to="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Features
              </Link>
              <Link
                to="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                About Us
              </Link>
              <Link
                to="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Support
              </Link>
              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute -z-50 transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <button onClick={()=>{navigate('/signin')}}>Sign in</button>
              </div>
            </div>
          </nav>
        )}
      </div>
     </div>
    </header>
  );
};

export default Navbar;