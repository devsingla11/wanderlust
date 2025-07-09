import React, { useEffect } from "react";  
import Hero from './Hero';
import './Destination.css';
import Footer from './Footer';
import Aos from "aos"; 
import "aos/dist/aos.css";

const Home=()=>{
    useEffect(()=>{
        Aos.init({ duration:700});
    }, [])
    return(<>
          <Hero 
          cName="hero nasty"
          herpimg="https://images5.alphacoders.com/688/thumb-1920-688445.jpg" 
          title="YOUR JOURNEY YOUR STORY"
          text="Choose your favourite destination"
          />
    
    <div className="destination">
    <h1 data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">Popular Destination</h1>
    <p>Tours give the opportunity to see a lot, within a time frame</p>
   
   <div className="first-des">
    <div className="des-text">
        <h2 data-aos="fade-up">Manali,Rohtang</h2>
        <p>On the other side of the Manalsu river is a part of Manali, time left behind. With a sweet scent of an old world charm, interspersed with guesthouses and an increasing presence of tourism and hints of the present that it brings along, Old Manali is a tiny shift in the world and its rush, one must experience while here.</p>
    </div>
    <div  className="image">
        <img data-aos="fade-up" src ="https://i.ytimg.com/vi/A6IKlaGoll8/maxresdefault.jpg"/>
        <img data-aos="fade-up" alt="img1" src="https://wallpaperaccess.com/full/5449706.jpg"/>
    </div>
   </div>
   <div className="first-des">
   <div className="des-text">
        <h2 data-aos="fade-up">Dharamshala,Mcleod Ganj</h2>
        <p>When travelers talk of staying in Dharamsala, McLeod Ganj is usually where they actually mean. A couple of miles north of Dharamsala proper (or six miles via the looping bus route), McLeod Ganj is the residence of His Holiness the 14th Dalai Lama and home to a large Tibetan population, including many maroon-robed monks and nuns.</p>
    </div>
    <div className="image">
        <img data-aos="fade-up" alt="img" src="https://i.pinimg.com/736x/c4/70/b9/c470b9cb00e848afa5695c0f8d56bc4f.jpg"/>
        <img data-aos="fade-up" alt="img1" src="https://arounddelhi.com/wp-content/uploads/2020/11/Dharamshala-1.jpg"/>
    </div>

   
   </div>
   <div className="first-des">
    <div className="des-text">
        <h2 data-aos="fade-up">Khajjiar,Dalhousie</h2>
        <p>Khajjiar lies on a small plateau with a small stream-fed lake in the middle that has been covered over with weeds. The hill station is surrounded by meadows and forests. It is about 2,000 metres (6,500 ft) above sea level in the foothills of the Dhauladhar ranges of the Western Himalayas and peaks can be seen in the distance. It is part of the Kalatop Khajiar Sanctuary.

Khajiar can be reached from Dalhousie, the nearest major town and hill station, by bus in an hour or so. It has a rare combination of three ecosystems: lake, pasture, and forest.</p>
    </div>
    <div className="image">
        <img data-aos="fade-up" alt="img" src="https://1.bp.blogspot.com/-JB9oAzTAxGA/WLlZOBGUSyI/AAAAAAAAvXM/y0ZVIthjGr4ywwAZFIqKgt9dgVOQN7K0QCLcB/s1600/Dalhousie.jpg"/>
        <img data-aos="fade-up"/*data-aos="flip-left"*/alt="img1" src="https://tse1.mm.bing.net/th?id=OIP.Xxth-9raHeaDQ7z45uV1nwHaEK&pid=Api&P=0&h=180"/>
    </div>
   </div>
   </div>
   <div className="trip">
        <h1  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">Recent Trip</h1>
        <p>You can choose unique destinations using google map</p>
    <div className="tripcard">
    <div class="card-group">
  <div class="card">
    <img data-aos="fade-in" src="https://indiatrotter.com/wp-content/uploads/2021/03/Khajjiar.jpg" class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title bg-primary text-center">Khajjiar</h5>
      <p data-aos="zoom-out-down" class="card-text bg-info text-center">Khajjiar lies on a small plateau with a small stream-fed lake in the middle that has been covered over with weeds. The hill station is surrounded by meadows and forests. It is about 2,000 metres (6,500 ft) above sea level in the foothills of the Dhauladhar ranges of the Western Himalayas and peaks can be seen in the distance.</p>
      
    </div>
  </div>
  <div class="card">
    <img data-aos="fade-in" src="http://2.bp.blogspot.com/-wt56D3HnEMc/UGrqUN7IjCI/AAAAAAAAByc/8Wp-L2xId7s/s1600/DSCN5748.JPG" class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title bg-primary text-center">Barot Valley</h5>
      <p class="card-text bg-info text-center">Barot, a part of the Uhl river valley, is a small village situated in the Mandi district of Himachal Pradesh. Considered to be a diamond among the rough terrains, Barot Valley was initially developed for a hydel project over the Uhl river that has now become a rising tourist spot for travellers who have a longing for mountains. </p>
      
    </div>
  </div>
  <div class="card">
    <img  data-aos="fade-in"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" src="https://devbhumi.in/wp-content/uploads/2014/01/shimla-ridge-snow-fall.jpg.webp" class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title bg-primary text-center">The Ridge Shimla</h5>
      <p data-aos="zoom-out-down" class="card-text bg-info text-center">The Ridge, nestled in the heart of Shimla, boasts an excellent hill-top location with a mix of traditional colonial architecture, panoramic scenic beauty, hassle-free atmosphere and lush vegetation. It is just a short stroll away from the famous Mall Road and has everything that you need to make the most of your vacation.</p>
      
    </div>
  </div>
</div>
       </div>
       </div>
        <Footer/>
    </>)
}
export default Home;