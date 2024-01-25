import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { SignOutButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

import logo from '../images/cc.png';
import './navstyles.css';

export default function Navi() {
  const { isLoaded, isSignedIn, user } = useUser();

  const imgpic = user?.imageUrl;

  return isLoaded && (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img src={logo} className="logo-nav-class" alt="Flowbite React Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img= {imgpic} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.firstName} {user?.lastName}</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item><SignOutButton afterSignOutUrl="/" /></Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="./" active>
            Home
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
