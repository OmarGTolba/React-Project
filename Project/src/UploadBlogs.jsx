import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContex';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const userId = localStorage.getItem('userId');
  const { darkMode, setDarkMode } = useAuth()
  
  // .............................................................................................................................................
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  // .............................................................................................................................................
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  // .............................................................................................................................................
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  // .............................................................................................................................................
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(currentDate);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('user', userId);
      formData.append('createdAt', formattedDate);
      const response = await axios.post('http://localhost:3000/blogs/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(formData);
      console.log('Blog added successfully:', response.data);
      setTitle('');
      setContent('');
      setImage(null);
      toast.success('Upload successful');
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.success('Upload failed');
    }
  };
  // .............................................................................................................................................

  return (
    <>
      <div className={`h-screen max-w-100mx-auto pt-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="text-3xl font-bold mb-4 ps-1">  Create Blog</h1>
        <div>  <form
          onSubmit={handleSubmit} className="max-w-md pt-4 mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} name="title" className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea id="content" name="content" value={content} onChange={handleContentChange} rows="6" className="border border-gray-300 rounded-md px-4 py-2 w-full resize-none"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogForm;
