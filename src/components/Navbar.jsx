import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FiMenu, FiX } from 'react-icons/fi';

function NavbarComponent() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (error) {
        console.error('Gagal decode token:', error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo TumorVision" className="w-10 h-10 object-contain" />

          <h1 className="text-[#969694] font-bold font-poppins text-base sm:text-lg">Tumor Vision</h1>
        </div>

        {/* Hamburger (mobile only) */}
        <button className="sm:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu Desktop */}
        <div className="hidden sm:flex items-center space-x-6 text-sm">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to={token ? '/analysis' : '/login'} className="block" onClick={() => setMenuOpen(false)}>
            Analysis
          </Link>

          {/* <Link to="/segmentation" className="hover:underline">
            Segmentation
          </Link> */}
          <Link to="/history/classification" className="hover:underline">
            History
          </Link>

          {token ? (
            <>
              <div className="text-yellow-500 font-semibold">Hi, {username || 'User'}</div>
              <div className="bg-red-500 px-4 py-1 rounded-md cursor-pointer hover:bg-red-400 transition text-sm" onClick={handleLogout}>
                Logout
              </div>
            </>
          ) : (
            <Link to="/login" className="bg-[#E5A00D] px-4 py-1 rounded-md cursor-pointer hover:bg-yellow-400 transition text-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-black text-sm">
          <Link to="/home" className="block" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/analysis" className="block" onClick={() => setMenuOpen(false)}>
            Analysis
          </Link>
          {/* <Link to="/segmentation" className="block" onClick={() => setMenuOpen(false)}>
            Segmentation
          </Link> */}
          <Link to="/history/classification" className="block" onClick={() => setMenuOpen(false)}>
            History
          </Link>

          {token ? (
            <>
              <div className="text-yellow-500 font-semibold">Hi, {username || 'User'}</div>
              <div
                className="bg-red-500 px-4 py-2 rounded-md cursor-pointer hover:bg-red-400 transition"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <Link to="/login" className="block bg-[#E5A00D] px-4 py-2 rounded-md text-center hover:bg-yellow-400 transition" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default NavbarComponent;
