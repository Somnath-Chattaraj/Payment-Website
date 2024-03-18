import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-4">
      <hr className="border-gray-300 w-full" />
      <div className="container mx-auto flex flex-col md:flex-col items-center justify-center px-4">
        <div className="text-center md:text-left mb-4 md:mb-4">
          <p className="text text-black pt-4 ">© {new Date().getFullYear()} Somnath Chattaraj</p>
          <p className="text text-black pl-7">All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 pl-6">
          <a href="https://www.instagram.com/somnath_chattaraj_910/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/somnath-chattaraj/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/Somnath-Chattaraj" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

