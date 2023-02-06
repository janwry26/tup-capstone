import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

function App() {
  return (
   <div>
   <Navbar/>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>

   </div>
  );
}

export default App;
