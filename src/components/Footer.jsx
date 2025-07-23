import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Social Media Icons */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-lg">Follow us</h3>
          <div className="flex space-x-4 text-xl">
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
            <FaGithub className="hover:text-gray-300 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-2">About</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>MRICONDYLENET</li>
              <li>PRIMA</li>
              <li>SENUSA</li>
              <li>ASHOKA</li>
              <li>DENTALEDU</li>
              <li>VEUME</li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-2">Product</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>MRICONDYLENET</li>
              <li>PRIMA</li>
              <li>SENUSA</li>
              <li>ASHOKA</li>
              <li>DENTALEDU</li>
              <li>VEUME</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-2">Sign up for updates on our latest innovations</h4>
            <input type="email" placeholder="Email address" className="w-full p-3 rounded text-black text-sm mb-2" />
            <p className="text-xs text-gray-400 mb-4">I accept Google’s Terms and acknowledge info will be used under Privacy Policy.</p>
            <Link to="/login" className="block text-center border border-yellow-400 rounded py-2 text-sm text-white hover:bg-yellow-400 hover:text-black transition">
              SIGN UP
            </Link>
          </div>
        </div>

        <hr className="border-gray-700 mt-12 mb-4" />

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">© MRICondyleNet Dev 2025 Inc. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
