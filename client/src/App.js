import "./App.css";
import Singin from "./Auth/Singin";
import AuthProvider from "./Context/AuthContext";
import Signup from "./Auth/Singup";
import Pageindex from "./Content";
import Getdetails from "./Content/Getdetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Singin} />
          <Route path="/home" Component={Pageindex} />
          <Route path="/signup" Component={Signup} />
          <Route path="/details" Component={Getdetails} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
