import React, { useState, createContext } from 'react';
import  {Route , Routes,link} from "react-router-dom";

import Home from './Home';



import About from './About';
import Contact from "./Contact";
import './index.css';
import Navbar from './Navbar';
import Trek from './Trek';
import Service from './Service';

// Create context
export const AppContext = createContext();

const App= () => {
  // Global state: user and login
  const [user, setUser] = useState(null);
  return (
    <>
    <AppContext.Provider value={{ user, setUser }}>
      <Navbar/>
       
    <Routes>
    <Route path="/" element={<Home></Home>}/> 
    <Route path="/About" element={<About></About>}/>
    <Route path="/Trek" element={<Trek></Trek>}/>
    <Route path="/Contact" element={<Contact></Contact>}/>
    <Route path="/Service" element={<Service></Service>}/>

  </Routes>
    </AppContext.Provider>
    </>
    );
};

export default App;
