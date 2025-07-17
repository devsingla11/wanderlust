import React, { useEffect} from "react";
import './FooterStyles.css';
import Aos from "aos"; 
import "aos/dist/aos.css";


const About= (props)=>{
    useEffect(()=>{
        Aos.init({ duration:2000});
    }, [])
    return(<>
        <div className="heading">
                 <h1  data-aos="flip-left">HIMACHAL PACKAGE</h1>  
                 <p>UP TO 60% OFF ON HOLIDAY PACKAGES</p>     
    </div>
      <div className="container">
        <div className="row">
            <div className="col-lg-4"><img data-aos="zoom-in-up" src="https://i.pinimg.com/736x/39/03/11/390311d5d2a6c3f0c2e788b777463c71.jpg"height="300px" width="300px"/>
                <h4>Manali Volvo Tour Packages</h4>
                  <p>4 days & 3 nights</p>
                  <button>ENQUIRE NOW</button>
            </div>
            <div className="col-lg-4"><img  src="https://wallpapercave.com/wp/wp3736332.jpg"height="300px"width="350px"/>
                <h4>Honeymoon Tour Packages</h4>
                <p>1 month</p>
                <button>ENQUIRE NOW</button>
            </div>
            <div className="col-lg-4"><img data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" src="https://dynamic.tourtravelworld.com/package-images/photo-big/dir_18/520609/208355.jpg"height="300px"width="300px"/>
                <h4>Family Shimla Manali Tour</h4>
                <p>6 days & 5 nights</p>
                <button>ENQUIRE NOW</button>
            </div>
        </div>
        <br/>
        <hr/>
           <div className="row1">
           <div className="col-lg-12">
                <h3  data-aos="flip-left">BEST RATES</h3>
                <h2>UP TO 60% OFF ON HOLIDAY PACKAGES BOOK NOW</h2>
     </div>
     </div>
     <hr/>
     <br/>
     <div className="row">
        <div className="col-lg-4"><img data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" src="https://image3.mouthshut.com/images/imagesp/925805233s.jpg"height="300px"width="300px"/>
            <h4>Manali Dalhousie</h4>
            <p>7 days & 6 nights</p>
            <button>ENQUIRE NOW</button>

        </div>
        <div className="col-lg-4"><img src="https://wallpapercave.com/wp/wp3481226.jpg"height="300px"width="300px"/>
            <h4>Golden Temple</h4>
            <p>2 days & 3 nights</p>
            <button>ENQUIRE NOW</button>

        </div>
        <div className="col-lg-4"><img data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" src="http://www.renttempotraveller.com/images/slider/parvati-valley-trek/parvati-valley-trek1.jpg"height="300px"width="300px"/>
            <h4>Full Himachal Tour Packages</h4>
            <p>7 days & 6 nights</p>
            <button>ENQUIRE NOW</button>

        </div>
        <br/>
        <hr/>
     <br/>
    <div className="row2">
        <div className="col-lg-12"/>
            <h4><b>Address</b></h4>
           <p>vpo palampur teh-palampur distt-kangra himanchal pradesh pincode-176061</p> 
    </div>
      </div>
      </div>
      <hr/>
       
    </>)
}
export default About;