import './App.css';
import { Login } from './Auth/Login';
import Pageindex from './Content';
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import { SignedIn, SignedOut } from "@clerk/clerk-react"

function App() {
  return (
    <div>
    <SignedOut>
      <Login/>
    </SignedOut>
    <SignedIn>
          <Pageindex/>
    </SignedIn>
     <BrowserRouter>
      <Routes>
        <Route path='./' Component={Login}/>
        <Route path='.home' Component={Pageindex}/>
      </Routes>
    </BrowserRouter>
    </div>
   
  );
}

export default App;
