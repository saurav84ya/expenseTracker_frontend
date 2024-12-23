import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import NoPage from './components/NoPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'

export default function App() {
  // const user = null  // Change this to check if the user is logged in
  // const isAuthenticated = false  // Checks if the user exists (authenticated)

  const {user , isAuthenticated , isLoading} = useSelector((state) => state.authSlice)

  console.log(user)


  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])

  
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/logup" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />

        <Route path='/home' element={isAuthenticated ? <Home/> :<Navigate to="/login" /> } />





        <Route path='*' element={<NoPage/>} />


      </Routes>
    </>
  )
}
