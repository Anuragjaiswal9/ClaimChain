import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Avatar } from "@nextui-org/react";
import { Logo } from './Logo';
import { SearchIcon } from './SearchIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { selectFullName } from '../features/Users/UserSlice'; 

function MyNavbar() {
  const [action, setAction] = useState(null);  // State to track which dropdown item is clicked
  const navigate = useNavigate();
  const fullName = useSelector(selectFullName);

  

  const handleDropdownAction = (key) => {
    setAction(key);  // Set the clicked action
  };

  useEffect(() => {
    if (action === 'logout') {
      // Perform logout-related tasks here if necessary
      // For example: clear session, authentication, etc.
      
      navigate('/');  // Navigate to the logout page
    }
  }, [action, navigate]);

  return (
    <Navbar className=''>
      <NavbarContent>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Lost
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Found
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
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={handleDropdownAction}>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="text-sky-500">{fullName}</p>
            </DropdownItem>
            <DropdownItem className='sm:hidden' key="Home">Home</DropdownItem>
            <DropdownItem className='sm:hidden' key="Lost">Lost</DropdownItem>
            <DropdownItem className='sm:hidden' key="Found">Found</DropdownItem>
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
