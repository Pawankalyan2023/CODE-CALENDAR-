import { Avatar, Dropdown, DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../images/cc.png";
import { useContext } from "react";
import "./navstyles.css";
import { AuthContext } from "../Context/AuthContext";

export default function Navi() {
  const { login, user, logout } = useContext(AuthContext);

  const imgpic = user?.imageUrl;

  return (
    login && (
      <>
        <Navbar fluid rounded>
          <Navbar.Brand href="/">
            <img
              src={logo}
              className="logo-nav-class"
              alt="Flowbite React Logo"
            />
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={imgpic} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <button onClick={logout}>Logout</button>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="./" className="text-center mt-1 text-xl" active>
              Home
            </Navbar.Link>
            <Navbar.Link  >
              <DarkThemeToggle />
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  );
}
