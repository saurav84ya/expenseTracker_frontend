import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Register = () => {
  const {user , isAuthenticated , isLoading} = useSelector((state) => state.authSlice)

  const dispatch = useDispatch();
  const { toast } = useToast();

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    // You can send `formData` to your backend here
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message || "server not responding",
          variant: "destructive",
        });
      }
    });

    // console.log("Form submitted", formData);
    // Reset form
    // setFormData(initialState);
  };

  return (
    <div className="flex h-screen bg-[#F9E6CF] "  >
      {/* Sidebar */}
      <div className="w-1/3 md:flex  text-black border-[5px] border-black rounded-xl m-5 hidden flex-col justify-center items-center p-6">
        <h2 className="text-4xl font-bold">Your App</h2>
        <p className="text-lg mt-4 text-center">
          Join us and start managing your finances today!
        </p>
      </div>

      {/* Registration Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center"
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
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
