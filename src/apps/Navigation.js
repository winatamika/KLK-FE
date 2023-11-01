import React, { useState } from 'react';
import logo from '../images/logo_kuning_kaleka.png';

function Navigation() {
  // State to control the visibility of the navigation menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu's visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full fixed z-20">
      <nav className="flex items-center flex-wrap bg-black p-3 justify-center">
        <a href="/" className="text-yellow-300 mr-4">
          <img
            className="cursor-pointer lg:none item-center"
            width="200"
            src={logo}
            alt="logo"
          />
        </a>

        <button
          onClick={toggleMenu} // Toggle the menu on button click
          className="inline-flex p-3 rounded lg:hidden text-white mr-auto hover:text-white outline-none"
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1.3rem"
            width="1.3rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div
          className={`w-full lg:inline-flex lg:flex-grow lg:w-auto ${
            menuOpen ? 'block' : 'hidden'
          }`} // Show/hide the menu based on the state
        >
          <div className="lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <a
              href="/beranda"
              className="border-transparent py-2 px-2 inline-flex items-center border-t-2 hover:border-green-800 text-yellow-300 font-semibold mr-2"
            >
              <div className="group inline-block">
                <div className="py-2 inline-flex items-center">
                  <span className="mr-1">BERANDA</span>
                </div>
              </div>
            </a>
            <a
              href="/tentang-kami"
              className="border-transparent py-2 px-2 inline-flex items-center border-t-2 hover:border-green-800 text-yellow-300 font-semibold mr-2"
            >
              <div className="group inline-block">
                <div className="py-2 inline-flex items-center">
                  <span className="mr-1">TENTANG KAMI</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
