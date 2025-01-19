import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaWarehouse } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { MdOutlineLocationCity } from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";

const Sidebar = () => {
  return (
    <aside className="bg-light-gray text-black w-64 h-screen fixed top-0 left-0 pt-16 mt-6">

      <nav>

        <ul>
          {[
            { path: "/dashboard", label: "Home", icon: <FaHome /> },
            { path: "/state", label: "State", icon: <RiGovernmentLine /> },
            { path: "/city", label: "City", icon: <MdOutlineLocationCity /> },
            { path: "/warehouse", label: "Warehouse", icon: <FaWarehouse /> },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center px-4 py-3 hover:bg-yellow-300"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
                <BiSolidRightArrow className="ml-auto" />
              </NavLink>
            </li>
          ))}

        </ul>

      </nav>

    </aside>
    
  );
};

export default Sidebar;
