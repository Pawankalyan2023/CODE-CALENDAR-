import React , {useContext}from "react";
import "./pagerror.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/Context/AuthContext";

export default function Pageerror() {

    const navigate = useNavigate();

    const {isLoggedIn} = useContext(AuthContext);

    const handleretrive = () => {
        if(isLoggedIn){
            navigate("/home");
        }
        else{
            navigate("/");
        }
    }

    return(
        <div id="container">

        <h1>404</h1>
      
        <h3>Looks like the page you're looking for doesn't exist.</h3>
      
        <a onClick={handleretrive}>Take me back home</a>
      </div>
    )
}