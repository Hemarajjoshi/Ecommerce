import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBars, FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {user} = useSelector((state) => state.auth);

  
  return (
    <nav className="bg-[#D4E4E1] shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full focus:outline-none"
            >
              <FaBars className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="hidden md:flex space-x-6 ml-4">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-600" : "text-gray-700"
                  } font-medium hover:text-blue-500 transition-colors duration-200`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/items"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-600" : "text-gray-700"
                  } font-medium hover:text-blue-500 transition-colors duration-200`
                }
              >
                Items
              </NavLink>
              <NavLink
                to="/new-items"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-600" : "text-gray-700"
                  } font-medium hover:text-blue-500 transition-colors duration-200`
                }
              >
                New Items
              </NavLink>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
              <button className=" cursor-pointer absolute right-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </div>

          {user && user.is_superuser && <button> <NavLink to={"/add-product"}> Add Product</NavLink></button>}

          <div className="flex items-center space-x-4">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-500 transition-colors duration-200`
              }
            >
              <CiShoppingCart className="w-6 h-6 stroke-current" />
              <span className="ml-1 font-medium">Cart</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-500 transition-colors duration-200`
              }
            >
              <FaUser className="w-5 h-5 fill-current" />
              <span className="ml-1 font-medium">Profile</span>
            </NavLink>
          </div>
        </div>

        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/home"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Home
            </NavLink>
            <NavLink
              to="/items"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Items
            </NavLink>
            <NavLink
              to="/new-items"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              New Items
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;