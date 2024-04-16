import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useAuth } from "./AuthContex";

export default function Notification() {
  
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("userId");
  const [value, setValue] = useState("");
  const { darkMode, setDarkMode } = useAuth();

 // .............................................................................................................................................
  const send = (value) => {
    socket?.emit("message", { content: value, userId: userId });
    // Clear input after sending
    setValue("");
    fetchMessages()
  };
// .............................................................................................................................................
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/messages");
      setMessages(response.data);
      console.log(messages);

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
// .............................................................................................................................................
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
    fetchMessages();
    return () => {
      newSocket.disconnect();
    };
  
  }, []);
// .............................................................................................................................................
  const messageListener = (message) => {
    console.log(message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };
// .............................................................................................................................................
  useEffect(() => {
    socket?.on("message", messageListener);

    return () => {
      socket?.off("message", messageListener);
    };
  }, [socket]);
// .............................................................................................................................................

  return (
    <div className={`flex flex-col w-1/2 mx-auto relative h-screen p-4 w-full ${
      darkMode ? "bg-gray-900 " :
       "bg-gray-100"
    }`}>
      <div className="flex-1 w-1/2 mx-auto overflow-y-auto max-h-[70vh]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message?.user?._id === userId ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`${
                message?.user?._id === userId ? "bg-green-200" : "bg-blue-200"
              } max-w-md rounded-lg p-2`}
            >
              <p className="m-0">{message.content}</p>
              <p className="text-sm text-gray-600">{message?.user?.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-1/2 mx-auto absolute bottom-20 right-0 left-0 end-0">
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="text"
          value={value}
          className="flex-1 px-4 py-2 p rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          onClick={() => send(value)}
          className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
  
}
