import React, { useContext } from "react";
import './index.css';
import { NavLink,Link} from "react-router-dom";
import { AppContext } from './App';


const Navbar= ()  =>{
    const { user, setUser } = useContext(AppContext);
    const handleLogin = () => setUser({ name: "Demo User" });
    const handleLogout = () => setUser(null);
    return(<>
    
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
  
    <NavLink className="navbar-brand" to="/">EXPLORENEST</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Trek">Trek</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Service">Services</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Contact">Contact</NavLink>
        </li>
        
       </ul>
       
      <div className="buttons">
      <a href="/" className="btn btn-outline-dark">
      <i className="fa fa-sign-in me-1"></i><b>BOOK NOW</b></a>
      {user ? (
        <>
          <span style={{marginLeft: 10, marginRight: 10}}>Welcome, {user.name}!</span>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button className="btn btn-outline-primary" onClick={handleLogin} style={{marginLeft: 10}}>Login</button>
      )}
      </div>

    </div>
  </div>
</nav>
    </>
    );
};
export default Navbar;