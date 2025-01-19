import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Redux/authSlice";
import { FaRegUserCircle, FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/DigitalFlake-Logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-custom-purple text-white px-6 py-2 shadow-lg w-full fixed top-0 z-50">
      <div className="flex justify-between items-center">
        
        <NavLink to="/dashboard">
          <img src={logo} alt="Digitalflake Logo" className="w-48 h-10 object-contain" />
        </NavLink>

        {/* User Icon */}
        <button onClick={() => setIsPopupOpen(true)} className="text-white text-2xl">
          <FaRegUserCircle />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-red-600 text-2xl" />
              <h2 className="text-lg font-bold">Log Out</h2>
            </div>
            <p className="text-center text-gray-700 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
