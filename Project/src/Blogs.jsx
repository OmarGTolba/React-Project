import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContex";
import { IoMdHeart } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

const Blogs = () => {

  const [heartColors, setHeartColors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [viewComments, setviewComments] = useState(false);
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");
  const { darkMode, setDarkMode } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation(); // Access the location object

  // .............................................................................................................................................
  useEffect(() => {
    fetchBlogs();
    fetchUser();
  }, []);
  // .............................................................................................................................................
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      console.log('Query parameter exists:', query);
      setSearchInput(query);
      fetchUser(query);
    } else {
      console.log('No query parameter exists');
    }
    fetchBlogs()
  }, [location.search]);
  // .............................................................................................................................................
  const fetchBlogs = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      if (query == "favorite") {
        try {
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          setUser(response.data);
          setBlogs(response.data.favorite);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      else {
        try {
          const response = await axios.get(`http://localhost:3000/blogs/search/${query}`);
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      }
    }
    else {
      try {
        const response = await axios.get("http://localhost:3000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
  };
  // .............................................................................................................................................
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  // .............................................................................................................................................
  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`/api/search/${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };
  // .............................................................................................................................................
  const toggleCommentInput = (blog) => {
    setSelectedBlog(blog);
    setShowCommentInput(!showCommentInput);
    if (selectedBlog !== blog) {
      fetchComments(blog);
    }
  };
  // .............................................................................................................................................
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // .............................................................................................................................................
  const toggleHeartColor = async (index, blog) => {
    await fetchUser()
    console.log(user);
    const isFavorite = user.favorite && user.favorite.some(item => item._id === blog._id);
    console.log(isFavorite);
    try {
      const newHeartColors = [...heartColors];
      newHeartColors[index] = !newHeartColors[index];
      setHeartColors(newHeartColors);
      if (isFavorite) {
        const response = await axios.delete(`http://localhost:3000/users/${userId}/favorite`, {
          data: { favorite: blog._id } // Use data instead of directly passing in the object
        });
        console.log(response);
      } else {
        const response = await axios.patch(`http://localhost:3000/users/${userId}/favorite`, {
          favorite: blog._id
        });
        console.log(response);
      }
      fetchBlogs();
      fetchUser();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  // .............................................................................................................................................
  const toggleViewComments = (blog) => {
    setSelectedBlog(blog);
    setviewComments(!viewComments);
    if (selectedBlog !== blog) {
      fetchComments(blog);
    }
  };
  // .............................................................................................................................................
  const fetchComments = async (blog) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/comments/${blog._id}`
      );
      setComments(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  // .............................................................................................................................................
  const submitComment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/comments", {
        blog: selectedBlog._id,
        comment: commentContent,
        user: userId,
      });
      console.log("Comment submitted:", response.data);
      setCommentContent("");
      fetchComments(selectedBlog);
      toast.success("comment added")
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("comment failed")
    }
  };
  // .............................................................................................................................................



  return (
    <div
      className={`p-4 max-w-100 h-100  mx-auto pb-32 ${darkMode ? "bg-gray-900 text-white" :
          "bg-gray-100 text-gray-900"
        }`}
    >
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      {Array.isArray(blogs) &&
        blogs.map((blog, index) => (
          <div
            key={blog._id}
            className=" max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4 "
          >
            <img
              src={`../public/${blog.image}`}
              className=" h-64 object-cover object-center w-full"
            />
            <div className="p-4">
              <h2 className="text-xl  text-gray-900 font-bold mb-2">
                {blog.title}
              </h2>
              {blog.user && (
                <p className="text-gray-700 text-base mb-4">{blog.content}</p>
              )}

              <p className="text-gray-500 text-sm">
                Published on {blog.createdAt}
              </p>
              <div className="pt-4 flex justify-between">
                <div>
                  <button
                    onClick={() => toggleCommentInput(blog)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                  >
                    {selectedBlog === blog && showCommentInput
                      ? "Close Comment"
                      : "Add Comment"}
                  </button>
                  <button
                    onClick={() => {
                      toggleViewComments(blog);
                      fetchComments(blog);
                    }}
                    className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                  >
                    {selectedBlog === blog && viewComments
                      ? "Hide Comments"
                      : "View Comments"}
                  </button>
                </div>
                <div >
                  <IoMdHeart onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleHeartColor(index, blog); }} color={user.favorite && user.favorite.some(item => item._id === blog._id) ? "red" : "grey"} size={32} />
                </div>
              </div>
              {selectedBlog === blog && showCommentInput && (
                <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="block w-full h-24 px-2 py-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    placeholder="Type your comment here..."
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      onClick={submitComment}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {selectedBlog === blog && comments.length && viewComments && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gray-100 p-2 rounded-md mb-2"
                    >
                      <p>{comment.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};


export default Blogs;
