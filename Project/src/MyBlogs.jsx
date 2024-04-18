import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContex';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';


const MyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const toastSuccess = (word) => toast.success(`${word} succesfully`);
  const toastError = (word) => toast.success(`${word} failed`);
  const userId = localStorage.getItem('userId');
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { darkMode, setDarkMode } = useAuth()

  // .............................................................................................................................................
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // .............................................................................................................................................
  useEffect(() => {
    fetchBlogs();
  }, []);
  // .............................................................................................................................................
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blogs');
      setBlogs(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  // .............................................................................................................................................
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/blogs/${id}`);
      fetchBlogs(); // Refresh the blogs after deletion
      toast.success("blog deleted successfully")
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.success("blog delete failed")
    }
  };
  // .............................................................................................................................................
  const handleUpdate = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };
  // .............................................................................................................................................
  const update = async (event) => {
    console.log(selectedBlog.image);
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', selectedBlog.title);
      formData.append('content', selectedBlog.content);
      formData.append('image', selectedBlog.image);
      formData.append('user', userId);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const response = await axios.patch(`http://localhost:3000/blogs/${selectedBlog._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Blog updated successfully:', response.data);
      handleCloseModal()
      fetchBlogs()
      toastSuccess("updated")
    } catch (error) {
      console.error('Error updating blog:', error);
      toastError("update")
    }
  };
  // .............................................................................................................................................

  return (
    <div className={` max-w-100max-w-md p-8 mx-auto max h-100 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
     {loading ? (
      <div className="sweet-loading absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50 absolute   left-0 right-0 flex z justify-center align-middle">
        <ClipLoader

          size={150}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    ) : (
    <div></div>
    )}
      <h1 className="text-3xl font-bold pb-4 ps-1">  My Blogs</h1>
      {Array.isArray(blogs) && blogs.map((blog, index) => (
        userId === blog?.user?._id && (
          <div key={index} className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4 ">
            <img src={`../public/${blog.image}`} className="w-full h-64 object-cover object-center" alt="" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{blog.title}</h2>
              <p className="text-gray-700 text-base mb-4">{blog.content}</p>
              <p className="text-gray-500 text-sm">Published on {blog?.createdAt}</p>
              <div className='flex justify-between pt-3'>
                <button onClick={() => handleUpdate(blog)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</button>
                <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">Delete</button>

              </div>

            </div>
          </div>
        )
      ))}
      {showModal && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
          <div className="relative bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg">
            <div className="absolute top-0 right-0 p-2">
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold pb-2">Update Blog</h2>
              <form>
                <input type="text" value={selectedBlog.title} onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })} className="block my-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                <textarea value={selectedBlog.content} onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })} className="block my-3 w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                <input type="file" accept="image/*" onChange={(e) => setSelectedBlog({ ...selectedBlog, image: e.target.files[0] })} className="mt-2" />
                <p onClick={update} className="pt-4 my-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default MyBlogs;
