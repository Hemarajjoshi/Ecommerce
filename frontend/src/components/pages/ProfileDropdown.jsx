import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { IoMdSwitch } from "react-icons/io";
import { AiFillYoutube } from "react-icons/ai";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full"
      >
        <FaUserCircle size={32} className="text-gray-600" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold text-lg">the new hem</h3>
          <p className="text-gray-500">@thenewhem</p>
          <hr className="my-2" />

          {/* Options */}
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
              <AiFillYoutube size={20} className="text-red-500" />
              <a href="#" className="text-gray-700">YouTube Studio</a>
            </li>
            <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
              <IoMdSwitch size={20} className="text-blue-500" />
              <a href="#" className="text-gray-700">Switch Account</a>
            </li>
            <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
              <MdExitToApp size={20} className="text-red-500" />
              <a href="#" className="text-gray-700">Sign Out</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
