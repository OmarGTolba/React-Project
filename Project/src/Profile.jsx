import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContex";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
export default function Profile() {

  const userId = localStorage.getItem("userId");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { darkMode, setDarkMode } = useAuth();

  // .............................................................................................................................................
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUser(response.data);
      setName(response.data.name);
      setAge(response.data.age);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  // .............................................................................................................................................
  useEffect(() => {
    fetchUser();
  }, [userId]);
  // .............................................................................................................................................
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  // .............................................................................................................................................
  const submit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("age", age);
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      fetchUser()
      toast.success("Profile Updated successfully")
    } catch (error) {
      console.error("Error updating user:", error);
      toast.success("Profile Update failed")
    }
  };
  // .............................................................................................................................................

  return (
    <div className={`pt-16 overflow-hidden w-full h-screen ${darkMode ? "bg-gray-900 text-white " :
        "bg-gray-100 text-gray-600"
      }`}>
      <div className={`max-w-xl mx-auto  rounded-lg shadow-md overflow-hidden `}>
        <div className="px-4 py-6 flex">
          <div className="flex items-start justify-start">
            {user && user.image ? (
              <img
                src={user.image}
                alt="User's Profile"
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-start">
                No image available
              </div>
            )}
          </div>
          <div className="text-start m-4 mt-8">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="">Age: {age}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="title"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="title"
              className="border border-gray-300 text-gray-600 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block  font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              name="age"
              className="border border-gray-300 text-gray-600 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md px-4 py-2  w-full"
            />
          </div>

          <button onClick={submit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
