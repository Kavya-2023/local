import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-accent text-center md:text-left">
          © {new Date().getFullYear()} LocalTreasures. All rights reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-gray-500">
            <FaFacebook size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-gray-500">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
