import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function DropdownProfile({profileImage, username}) {
  return (
    <DropdownMenu>
      {/* Avatar becomes the trigger for the dropdown menu */}
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center gap-4">
          <Avatar>
            <AvatarImage src={profileImage} alt="Profile Picture" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>{username}</div>
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown menu content */}
      <DropdownMenuContent className="mt-2.5 p-2 bg-white rounded shadow-lg">
        <DropdownMenuItem>Account Overview</DropdownMenuItem>
        <DropdownMenuItem>Media</DropdownMenuItem>
        <DropdownMenuItem>Files</DropdownMenuItem>
        <DropdownMenuItem>Groups</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownProfile;
