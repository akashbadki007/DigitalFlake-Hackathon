import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './Redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetErrorMessage, setResetErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login/admin', { email, password });
      if (response.data.success) {
        dispatch(loginSuccess({ token: response.data.token }));
        navigate('/dashboard'); 
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Something went wrong!');
      dispatch(loginFailure(error.response?.data?.msg || 'Something went wrong!'));
    }
  };

  const handleForgotPassword = () => {
    setIsModalOpen(true); 
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/reset-password', { email: resetEmail });
      setSuccessMessage(response.data.msg); 
      setResetErrorMessage('');
      setTimeout(() => {
        setIsModalOpen(false); 
        setResetEmail(''); 
        setSuccessMessage(''); 
      }, 2000);
    } catch (error) {
      setResetErrorMessage(error.response?.data?.msg || 'Something went wrong!');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="DigitalFlake Logo" className="mx-auto mb-1 w-32" />
          <h2 className="text-[18px] text-gray-500 font-[500] text-center">Welcome to DigitalFlake Admin</h2>
        </div>

        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-purple text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-indigo-600 hover:text-indigo-800"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Request Password Reset</h2>
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">Enter Your Email</label>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {resetErrorMessage && (
                <div className="mt-2 text-red-600 text-sm">
                  {resetErrorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mt-2 text-green-600 text-sm">
                  {successMessage}
                </div>
              )}
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setResetErrorMessage('');
                  setSuccessMessage('');
                }}
                className="w-1/2 bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="w-1/2 bg-custom-purple text-white p-2 rounded-md hover:bg-indigo-700"
              >
                Request Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
