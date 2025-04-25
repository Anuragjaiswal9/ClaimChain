import React, { useEffect, useState } from "react";
import DisplayMessages from "./DisplayMessages";
import MessageBox from "./MessageBox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Profile from "./Profile";
import Contacts from "./Contacts";
import socketAPI from "@/services/socketAPI";

import { useLocation } from "react-router-dom";
import SocketService from "@/services/socketServices";

function Home() {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(() => location.state.receiverId);


  const [messages, setMessages] = useState([]);
  const username = location.state.senderId;
  console.log(username);
  useEffect(() => {
    if (username) {
      // Establish socket connection and pass userId in query

      socketAPI.connect(username);

      // socketAPI.onPrivateMessage((data) => {
      //   // console.log("Received message:", data); // Log for debugging
      //   setMessages((prevMessages) => [...prevMessages, data.messages]);
      // });

      // Cleanup on unmount

      return () => {
        socketAPI.disconnect();
        console.log("Socket disconnected for user:", username);
      };
    }
  
  }, [username]);

  // Subscribe to private messages when the component mounts
  useEffect(() => {
    if (selectedUser) {
      // Subscribe to private messages for the selected user
      socketAPI.onPrivateMessage((data) => {
        // Add the received message to the message list
        setMessages((prevMessages) => [...prevMessages, data.messages]);
      });

      // Unsubscribe when the component unmounts or the selectedUser changes
      return () => {
        socketAPI.offPrivateMessage();
      };
    }
  }, [selectedUser]);

  const handleMessageSubmit = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  return (
    <div className="h-[100vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-max rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={8}>
              <div className="flex h-full items-center justify-start p-2">
                <span className="font-semibold">
                  <Profile username={username} />
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
                <DisplayMessages messages={messages} />
                <div className="flex items-end justify-center w-[100%] gap-2">
                  <MessageBox
                    senderId={username}
                    receiverId={selectedUser}
                    onMessageSubmit={handleMessageSubmit}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Home;
