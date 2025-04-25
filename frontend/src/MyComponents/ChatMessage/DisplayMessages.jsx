import React, { useEffect, useRef } from 'react';

function DisplayMessages({ messages }) {
  const messagesEndRef = useRef(null); // Create a ref to the messages container

  // console.log("displaymessages", messages);

  // Scroll to the bottom every time the messages array changes
  useEffect(() => {
    // Scroll to the bottom of the container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // This will trigger every time the messages change

  return (
    <div className="h-screen p-2 flex flex-col gap-3 w-[100%] overflow-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${
              msg.isSent ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
            }`}
          >
            <p>{msg.message}</p>
            <span className="text-xs text-gray-500 mt-1 block text-right">
              {msg.timestamp}
            </span>
          </div>
        </div>
      ))}
      {/* This ref will be at the bottom of the messages container */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default DisplayMessages;
