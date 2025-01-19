import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "./Redux/stateSlice";
import { fetchCities, createCity, updateCity, deleteCity } from "./Redux/citySlice";
import { useForm } from "react-hook-form";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Spinner from "../Components/Spinner";
import { RiEdit2Line, RiDeleteBin6Line, RiMapPinLine } from "react-icons/ri";

const CityPage = () => {
  const dispatch = useDispatch();
  const { states } = useSelector((state) => state.state);
  const { cities, loading } = useSelector((state) => state.city);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingCity, setEditingCity] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteCityId, setDeleteCityId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchCities());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (editingCity) {
      dispatch(updateCity({ id: editingCity._id, ...data }));
      setEditingCity(null);
    } else {
      const newCity = {
        name: data.name,
        code: data.code,
        stateId: data.stateId,
        status: "Active",
      };
      dispatch(createCity(newCity));
    }
    reset();
    setShowPopup(false);
  };

  const confirmDelete = () => {
    dispatch(deleteCity(deleteCityId));
    setShowDeletePopup(false);
    setDeleteCityId(null);
  };

  const openAddPopup = () => {
    reset();
    setEditingCity(null);
    setShowPopup(true);
  };

  const openEditPopup = (city) => {
    setEditingCity(city);
    setValue("name", city.name);
    setValue("code", city.code);
    setValue("stateId", city.stateId);
    setValue("status", city.status);
    setShowPopup(true);
  };

  const filteredCities = searchTerm
    ? cities.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cities;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full fixed top-0 bg-white shadow z-10">
        <Navbar />
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="w-64 h-screen fixed top-16 left-0 bg-gray-800 text-white">
          <Sidebar />
        </aside>

        <main className="ml-64 flex-1 px-6 py-6 bg-gray-50">
          <div className="bg-white p-4 shadow rounded-md mb-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <RiMapPinLine className="mr-2" size={25} />
              <h1 className="text-[25px] font-bold text-gray-800">City</h1>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by City Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
                onClick={openAddPopup}
              >
                Add City
              </button>
            </div>
          </div>

          {loading ? (
            <div>  <Spinner/> </div>
          ) : filteredCities.length > 0 ? (
            <table className="table-auto w-full border">
              <thead className="bg-gray-400">
                <tr>
                  <th className="border p-2 text-center">ID</th>
                  <th className="border p-2 text-center">City Name</th>
                  <th className="border p-2 text-center">City Code</th>
                  <th className="border p-2 text-center">State Name</th>
                  <th className="border p-2 text-center">Status</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCities.map((city) => (
                  <tr key={city._id} className="border table-auto w-full border-collapse bg-white shadow-md rounded-md">
                    <td className="border p-2 text-center">{city._id}</td>
                    <td className="border p-2 text-center">{city.name}</td>
                    <td className="border p-2 text-center">{city.code || "N/A"}</td>
                    <td className="border p-2 text-center">
                      {states.find((state) => state._id === city.stateId)?.name || "N/A"}
                    </td>
                    <td className="border p-2 text-center">
                      <span
                        className={`text-sm font-medium ${
                          city.status === "Active" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {city.status}
                      </span>
                    </td>
                    <td className="border p-2 flex justify-center items-center gap-2">
                      <button className="text-blue-500" onClick={() => openEditPopup(city)}>
                        <RiEdit2Line size={20} />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          setShowDeletePopup(true);
                          setDeleteCityId(city._id);
                        }}
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center gap-4 p-4 text-center text-gray-500 bg-white shadow-md rounded-md">
              <p className="text-lg">No cities found. Start by adding a new city.</p>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
                onClick={openAddPopup}
              >
                Add City
              </button>
            </div>
          )}

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">{editingCity ? "Edit City" : "Add City"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      className="border p-2 rounded"
                      placeholder="City Name"
                      {...register("name", { required: true })}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="City Code"
                      {...register("code", { required: true })}
                    />
                    <select className="border p-2 rounded" {...register("stateId", { required: true })}>
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state._id} value={state._id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {editingCity && (
                      <select className="border p-2 rounded" {...register("status", { required: true })}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="bg-gray-300 px-4 py-2 rounded mr-2"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      {editingCity ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDeletePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Delete City</h2>
                <p className="text-center">Are you sure you want to delete this city?</p>
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={confirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CityPage;
