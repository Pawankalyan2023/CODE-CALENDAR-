import "./App.css";
import Singin from "./Auth/Singin";
import AuthProvider from "./Context/AuthContext";
import Signup from "./Auth/Singup";
import Pageindex from "./Content";
import Getdetails from "./Content/Getdetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Pageerror from "./pageerror";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' Component={Dashboard} />
          <Route path="/" Component={Singin} />
          <Route path="/home" Component={Pageindex} />
          <Route path="/signup" Component={Signup} />
          <Route path="/details" Component={Getdetails} />
          <Route path="*" element={<Pageerror/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
