import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Avatar } from "@nextui-org/react";
import { Logo } from './Logo';
import { SearchIcon } from './SearchIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFullName, selectAvatarName } from '../features/Users/UserSlice';
import axios from 'axios';

function MyNavbar() {
  const [navAction, setNavAction] = useState(null);  // State to track navigation action
  const navigate = useNavigate();
  const fullName = useSelector(selectFullName);
  const AvatarName = useSelector(selectAvatarName);

  // Effect to handle navigation actions
  useEffect(() => {

    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:8000/api/v1/users/user/logout", {}, { withCredentials: true });
        navigate('/');  // Navigate to logout or home page
      } catch (error) {
        console.log(error);
      }
    };

    if (navAction === 'Home') {
      navigate('/Home');  // Navigate to Home page
    } else if (navAction === 'Report') {
      navigate('/Report-Item');  // Example page for 'Lost'
    }
    else if (navAction === 'logout') {
      handleLogout(); // Call the async logout function
    } else if (navAction === 'settings') {
      navigate('/Edit');  // Navigate to the settings page
    }

    // Clear action after navigating to avoid unnecessary re-trigger
    setNavAction(null);
  }, [navAction, navigate]);

  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            onClick={() => setNavAction('Home')}  // Set the action to 'Home'
          >
            Home
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="#" aria-current="page" onClick={() => setNavAction('Report')}>
            Report Item
          </Link>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="max-sm:w-14 h-auto"
              color="primary"
              size="md"
              src={AvatarName}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => setNavAction(key)}>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="text-sky-500">{fullName}</p>
            </DropdownItem>
            <DropdownItem className='sm:hidden' key="Home">Home</DropdownItem>
            <DropdownItem className='sm:hidden' key="Report">Report Item</DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default MyNavbar;