import React from 'react';
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-black w-full py-8 flex flex-col items-center text-white">
      {/* Name Section */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">Arshad aka Jenix</h2>
        <p className="text-lg">Web Developer | Software Enthusiast</p>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-8 justify-center mt-6">
        {/* Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-125 transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full">
            <FaInstagram size={30} />
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-125 transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full">
            <FaFacebook size={30} />
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://www.github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-125 transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-gray-700 to-black p-4 rounded-full">
            <FaGithub size={30} />
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-125 transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-900 p-4 rounded-full">
            <FaLinkedin size={30} />
          </div>
        </a>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Arshad aka Jenix. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
