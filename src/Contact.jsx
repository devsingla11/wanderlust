import React, { useState } from "react";
import "./HeroStyles.css";
import Footer from './Footer';
import './FooterStyles.css';

const Contact=()=>{
    // Add state for form fields and submission status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        setSubmitted(true);
        // Simulate sending (could add async logic here)
        setTimeout(() => {
            setSubmitted(false);
            setEmail("");
            setPassword("");
            setChecked(false);
        }, 2000);
    };

    return(<>
    <div className="row">
    <div className="col-lg-6 mt-3 p-3">
        <img src="https://theadventurenomads.com/wp-content/uploads/2018/03/maxresdefault-3.jpg" height="300px" width="750px"/>
    </div>
   
   <div className="col-lg-6 mt-3 p-3">
     <div className="form">
       <form onSubmit={handleSubmit}>
 <div className="mb-3">
<center>  <h4><b>PLan your trip</b></h4></center>
   <label htmlFor="exampleInputEmail1" className="form-label"><br/>Email address</label>
   <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
   <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
 </div>
 <div className="mb-3">
   <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
   <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
 </div>
 <div className="mb-3 form-check">
   <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={checked} onChange={e => setChecked(e.target.checked)} />
   <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
 </div>
 {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}
 {submitted && <div style={{color: 'green', marginBottom: 10}}>Enquiry sent! Thank you.</div>}
 <button type="submit" className="btn btn-primary" disabled={submitted}>{submitted ? "Sending..." : "Send Enquiry"}</button>
</form>
</div>
       </div>
       </div>
      <hr/>
    <Footer/>
    </>)
}
export default Contact;