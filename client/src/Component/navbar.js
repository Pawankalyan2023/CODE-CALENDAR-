import { Avatar, Dropdown, DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../images/cc.png";
import whitelogo from "../images/cc.png";
import React , { useContext } from "react";
import "./navstyles.css";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navi() {

 
  const navigate = useNavigate();

  const { login, user, logout } = useContext(AuthContext);

  const handlelogout = () => {
    logout();
    navigate("/");
  }

  const imgpic = user?.imageUrl;

  return (
    login && (
      <>
        <Navbar fluid rounded>
          <Navbar.Brand href="/">
          <h1 className="lg:text-xl md:text-l dark:text-white"
              alt="Flowbite React Logo">
                CCode
            </h1>

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
              {/* <Dropdown.Item>
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
              </Dropdown.Item> */}
              <Dropdown.Item>
                <button onClick={handlelogout}>Logout</button>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="./" className="text-center mt-1 text-xl" active>
              Home
            </Navbar.Link>
            <Navbar.Link >
              <DarkThemeToggle/>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  );
}
