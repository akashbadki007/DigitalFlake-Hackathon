import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates, createState, updateState, deleteState } from "./Redux/stateSlice";
import { useForm } from "react-hook-form";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Spinner from "../Components/Spinner";
import { RiEdit2Line, RiDeleteBin6Line, RiGovernmentLine } from "react-icons/ri";

const StatePage = () => {
  const dispatch = useDispatch();
  const { states, loading } = useSelector((state) => state.state);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingState, setEditingState] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteStateId, setDeleteStateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (editingState) {
      dispatch(updateState({ id: editingState._id, ...data }));
      setEditingState(null);
    } else {
      dispatch(createState({ name: data.name, code: data.code, status: "Active" }));
    }
    reset();
    setShowPopup(false);
  };

  const confirmDelete = () => {
    dispatch(deleteState(deleteStateId));
    setShowDeletePopup(false);
    setDeleteStateId(null);
  };

  const openAddTodoPopup = () => {
    reset();
    setEditingState(null);
    setShowPopup(true);
  };

  const openEditPopup = (state) => {
    setEditingState(state);
    setValue("name", state.name);
    setValue("code", state.code);
    setValue("status", state.status);
    setShowPopup(true);
  };

  const filteredStates = searchTerm
    ? states.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : states;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full fixed top-0 bg-white shadow z-10">
        <Navbar />
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="w-64 fixed top-16 left-0 bg-gray-800 text-white h-screen">
          <Sidebar />
        </aside>

        <main className="ml-64 flex-1 p-6 bg-gray-50">
          <div className="bg-white p-4 shadow rounded-md mb-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <RiGovernmentLine size={30} className="text-blue-500" />
              <h1 className="text-2xl font-semibold text-gray-800">State</h1>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-72 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search by State Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700"
                onClick={openAddTodoPopup}
              >
                Add New
              </button>
            </div>
          </div>

          {loading ? (
             <div>  <Spinner/> </div>
          ) : filteredStates.length > 0 ? (
            <table className="table-auto w-full border-collapse bg-white shadow-md rounded-md">
              <thead className="bg-gray-400">
                <tr>
                  <th className="border p-3  font-medium text-center">ID</th>
                  <th className="border p-3 text-center font-medium">State Name</th>
                  <th className="border p-3 text-center font-medium">State Code</th>
                  <th className="border p-3 text-center font-medium">Status</th>
                  <th className="border p-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStates.map((state) => (
                  <tr key={state._id} className="hover:bg-gray-100">
                    <td className="border p-3 text-center">{state._id}</td>
                    <td className="border p-3 text-center">{state.name}</td>
                    <td className="border p-3 text-center">{state.code}</td>
                    <td className="border p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-sm font-semibold ${
                          state.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {state.status}
                      </span>
                    </td>
                    <td className="border p-3  flex justify-center items-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openEditPopup(state)}
                      >
                        <RiEdit2Line size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setShowDeletePopup(true);
                          setDeleteStateId(state._id);
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
            <div className="flex flex-col items-center justify-center h-64 bg-white shadow rounded-md">
              <p className="text-lg text-gray-500">No states found.</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                onClick={openAddTodoPopup}
              >
                Add a State
              </button>
            </div>
          )}

          {/* Popup for Add/Edit */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">
                  {editingState ? "Edit State" : "Add State"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <input
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="State Name"
                      {...register("name", { required: true })}
                    />
                    <input
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="State Code"
                      {...register("code", { required: true })}
                    />
                    {editingState && (
                      <select
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("status", { required: true })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      {editingState ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold text-center mb-4">
                  Delete State
                </h2>
                <p className="text-gray-600 text-center">
                  Are you sure you want to delete this state?
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default StatePage;
