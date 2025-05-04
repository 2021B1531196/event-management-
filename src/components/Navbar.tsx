import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, Calendar, LogOut, Home, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Calendar className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Eventify</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/events" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                Events
              </Link>
              {isAuthenticated && (
                <Link to="/create-event" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Create Event
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
                      alt="User avatar"
                    />
                    <span className="ml-2 text-gray-700">{user?.name}</span>
                    <ChevronDown size={16} className="ml-1 text-gray-500" />
                  </button>
                </div>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn btn-sm btn-secondary">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-sm btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden animate-fade-in">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                Home
              </div>
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                Events
              </div>
            </Link>
            {isAuthenticated && (
              <Link
                to="/create-event"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Create Event
                </div>
              </Link>
            )}
          </div>
          
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
                    alt="User avatar"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-2" />
                    Your Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut size={18} className="mr-2" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex justify-center space-x-4 px-4">
                <Link to="/login" className="btn btn-md btn-secondary w-full" onClick={toggleMenu}>
                  Log in
                </Link>
                <Link to="/register" className="btn btn-md btn-primary w-full" onClick={toggleMenu}>
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;