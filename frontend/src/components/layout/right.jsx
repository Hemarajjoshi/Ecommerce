import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [cartItems] = useState(3); // Example cart items count

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Navigation links */}
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/collections" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
              Collections
            </Link>
            <Link to="/new" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
              New
            </Link>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-6">
            {/* Profile Icon */}
            <button className="relative text-gray-800 hover:text-gray-600 transition-colors">
              <FaUser className="w-6 h-6" />
              <span className="sr-only">Profile</span>
            </button>

            {/* Cart Icon with badge */}
            <Link to="/cart" className="relative text-gray-800 hover:text-gray-600 transition-colors">
              <FaShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;