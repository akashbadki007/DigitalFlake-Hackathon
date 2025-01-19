import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full fixed top-0 bg-white shadow-md z-10">
        <Navbar />
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 h-screen fixed top-16 left-0 bg-gray-800 text-white">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-4 bg-gray-50 flex justify-center items-center">
          <div className="text-center">
            <img
              src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png"
              alt="DigitalFlake Logo"
              className="mx-auto w-40"
            />
            <h2 className="text-lg font-semibold text-gray-900 mt-4">
              Welcome to DigitalFlake Admin
            </h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
