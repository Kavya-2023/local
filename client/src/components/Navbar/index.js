import React, { useState, useEffect, useContext } from 'react';
import { IoIosMenu, IoIosClose, IoIosCart, IoMdLocate } from 'react-icons/io';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { CountryStateContext } from '../../contexts/CountryStateContext'; // Import the context

const Navbar = ({ toggleLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { selectedCountry, setSelectedCountry, selectedState, setSelectedState } = useContext(CountryStateContext); // Use the context values
  const userEmail = localStorage.getItem('email');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('email');
    toggleLogin(true);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState(''); // Reset state when country changes
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  useEffect(() => {
    // Handle side effects related to userEmail or other dependencies
  }, [userEmail]);

  return (
    <header className="bg-background shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-2">
        <div>
          <img className="w-16 cursor-pointer" src={logo} alt="Logo" />
        </div>
        <div className={`nav-links duration-500 md:static absolute bg-background md:min-h-fit min-h-[60vh] left-0 ${menuOpen ? 'top-[9%]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5`}>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-text">
            <li>
              <Link to='/'>
                <a className="hover:text-gray-500" href="#">Home</a>
              </Link>
            </li>
            <li>
              <Link to="/products">
                <a className="hover:text-gray-500" href="#">Products</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          {selectedCountry === 'India' && (
            <div>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none"
              >
                <option value="">Select State</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Goa">Goa</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
          )}
          <Link to='/map'>
            <button className="text-3xl text-gray-500">
              <IoMdLocate />
            </button>
          </Link>
          <Link to='/cart'>
            <button className="text-3xl text-gray-500">
              <IoIosCart />
            </button>
          </Link>
          {userEmail ? (
            <button className="bg-accent text-white px-5 py-2 rounded-full hover:bg-[#DF4C73CC]" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button className="bg-accent text-white px-5 py-2 rounded-full hover:bg-[#DF4C73CC]" onClick={toggleLogin}>Sign In</button>
          )}
          <button onClick={toggleMenu} className="text-3xl cursor-pointer md:hidden text-text">
            {menuOpen ? <IoIosClose /> : <IoIosMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
