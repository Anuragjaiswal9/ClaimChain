import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Contacts({ users, onClicking }) {
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user

  const handleClick = (username) => {
    if (username) {
      console.log("Selected username:", username);
      setSelectedUser(username); // Update the selected user state
      onClicking(username); // Notify the parent component
    } else {
      alert("Please select a valid username.");
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-start items-start">
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => handleClick(user.username)}
          className={`cursor-pointer flex items-center gap-4 my-2 p-2 rounded-md w-[100%] ${
            selectedUser === user.username ? "bg-gray-200" : "" // Highlight if selected
          }`}
        >
          <Avatar>
            <AvatarImage src={user.profileImage || ""} alt={`${user.username} Profile Picture`} />
            <AvatarFallback>{user.username?.[0]?.toUpperCase() || "UN"}</AvatarFallback>
          </Avatar>
          <div>{user.username}</div>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
