import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/authSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Login = () => {

  const {isLoading} = useSelector((state) => state.authSlice)
  const {toast} = useToast();
  const dispatch = useDispatch()
 
  const initialState = {
    email : "",
    password : "",
  }

  const [formData , setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Field: ${name}, Value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    dispatch(loginUser(formData))
      .then((data) => {
        console.log(data)
        if(data?.payload?.success){
          toast({
            title: data?.payload?.message || "server not responding",
          });
        }else{
          toast({
            title: data?.payload?.message || "server not responding",
            variant: "destructive",
          });
        }
      })

  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white hidden md:flex flex-col justify-center items-center p-6">
        <h2 className="text-4xl font-bold">Your App</h2>
        <p className="text-lg mt-4 text-center">Manage your money effectively with ease!</p>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}  >
          <input
            type="email"
            name='email'
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/logup" className="text-indigo-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
