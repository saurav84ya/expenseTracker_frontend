import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import NoPage from './components/NoPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'
import Recovery from './components/Recovery'

export default function App() {
  // const user = null  // Change this to check if the user is logged in
  // const isAuthenticated = false  // Checks if the user exists (authenticated)

  const {user , isAuthenticated ,isServerLoading, isLoading} = useSelector((state) => state.authSlice)

  // //(user)


  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])


  if (isServerLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-[#FAC67A] px-4">
        <div className="text-lg font-semibold text-gray-800 mb-2">
          Just a moment...
        </div>
        <p className="text-base text-gray-600">
          Our server might take a little longer to start as it's hosted on a free plan. 
          Thank you for your patience!
        </p>
        <div className="mt-4">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
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
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }


  
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/logup" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
        <Route path='/home' element={isAuthenticated ? <Home/> :<Navigate to="/login" /> } />
        <Route path="/recovry" element={isAuthenticated ? <Home/> :<Recovery/> }/>
        <Route path='*' element={<NoPage/>} />
      </Routes>
    </>
  )
}
