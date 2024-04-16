import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContex';
import { WiDaySunny, WiMoonAltWaningCrescent6 } from 'react-icons/wi';
import { FaSearch, FaSignOutAlt, FaHome, FaComments, FaFlag, FaPen, FaHeart, FaUser } from 'react-icons/fa';

export default function NavBar() {

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { darkMode, setDarkMode } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();

  // .............................................................................................................................................
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId); // Set isLoggedIn based on whether userId exists in localStorage
  }, []);
  // .............................................................................................................................................
  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };
  // .............................................................................................................................................
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?query=${searchQuery}`);
  };
  // .............................................................................................................................................
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // .............................................................................................................................................
  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };
  // .............................................................................................................................................

  return (
    <>
      <nav className="bg-gray-800 p-4 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-semibold flex items-center">
            {darkMode ? (
              <WiDaySunny size={36} color="#FFA500" onClick={toggleDarkMode} />
            ) : (
              <WiMoonAltWaningCrescent6
                size={36}
                color="#FFFFFF"
                onClick={toggleDarkMode}
              />
            )}
            <h3 className='mb-1'> &lt;- Click the icon  </h3>

          </div>

          <div className="flex justify-center space-x-6 items-center">
            {isLoggedIn ? (
              <>

                <Link to="/blogs" className="text-white hover:text-gray-300">
                  <FaHome size={32} className='' color="white" />
                </Link>



                <Link
                  to="/upload"
                  className="text-white hover:text-gray-300"
                >
                  <FaPen size={24} color="white" />
                </Link>
                <Link
                  to="/myblogs"
                  className="text-white hover:text-gray-300"
                >
                  <FaFlag size={24} color="white" />
                </Link>
                <Link to="/blogs?query=favorite" className="text-white hover:text-gray-300 space">
                  <FaHeart size={24} />
                </Link>
                <Link
                  to="/chat"
                  className="text-white hover:text-gray-300"
                >
                  <FaComments size={24} color="white" />
                </Link>

              </>
            ) : (
              <>

              </>
            )}
          </div>

          <div className="flex space-x-4 items-center">

            {isLoggedIn ? (
              <>
                <div className="relative flex">
                  {showSearchInput && (
                    <form onSubmit={handleSearch} id='searchForm' className="absolute right-8">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded px-4 py-2 border text-sm text-gray-800 border-gray-200 bg-white"
                      />
                      <button
                        type="submit"
                        className="px-2 bg-gray-700 absolute right-0 top-0 bottom-0  text-white font-bold rounded"
                      >
                        Search
                      </button>
                    </form>
                  )}

                  <FaSearch
                    className="h-5 w-5 text-white cursor-pointer"
                    onClick={toggleSearchInput}
                  />

                </div>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300"
                >
                  <FaUser size={24} color="white" />
                </Link>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300"
                >
                  <FaSignOutAlt size={24} color="white" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-300"
                >
                  Sign Up
                </Link>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
