import { useState } from 'react'


import './App.css'
import LoginForm from './loginForm'
import RegisterForm from './RegisterForm'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadImage from './UploadBlogs'
import NavBar from './NavBar'
import ReactDOM from 'react-dom';
import React from 'react';
import Blogs from './Blogs'
import MyBlogs from './MyBlogs'
import { AuthProvider } from './AuthContex'
import NotificationPanel from './LocalChat';
import Profile from './Profile'
import { ToastContainer } from 'react-toastify';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <ToastContainer />
          <NavBar />
          <Routes> 
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/Chat" element={<NotificationPanel />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
