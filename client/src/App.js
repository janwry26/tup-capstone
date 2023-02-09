import jwtDecode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";

import './App.css';
import Navbar from './components/Navbar.js';
import Routing from "./components/routing/Routing";
import {BrowserRouter} from 'react-router-dom';

let logUser;
if (localStorage.getItem("token")) {
    const jwt = localStorage.getItem("token");
    setAuthToken(jwt);
    logUser = jwtDecode(jwt);
}

function App() {
  const user = logUser;
  console.log("User: ", user)
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar/>
        <div className='main'>
          <Routing user={user} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
