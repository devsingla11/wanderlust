import React, {useEffect, useState} from "react";
import './FooterStyles.css';
import Aos from "aos"; 
import "aos/dist/aos.css";


const Trek=()=>{
    useEffect(()=>{
        Aos.init({ duration:2000});
    }, [])
    // Add state for search query
    const [search, setSearch] = useState("");
    // Trek data as array
    const treks = [
        { name: "Shrikhand Mahadev Trek", img: "https://images.bhaskarassets.com/web2images/521/2024/07/15/r_1721041849.jpg", days: "1 days & 6 nights" },
        { name: "Kinner Kailesh Trek", img: "https://i.pinimg.com/originals/8b/3e/63/8b3e6369db5b1fbccd0cfb049bf88628.jpg", days: "1 days & 5 nights" },
        { name: "Triund Trek", img: "https://i0.wp.com/stampedmoments.com/wp-content/uploads/2023/09/triund-peak-2.jpg?fit=768%2C1024&ssl=1", days: "2 days & 1 nights" },
        { name: "Hampta Pass Trek", img: "https://www.thrillophilia.com/blog/wp-content/uploads/2015/03/shutterstock_1697054380-2048x1365.jpg", days: "6 days & 5 nights" },
        { name: "Beas Khund Trek", img: "https://tripvana.in/wp-content/uploads/2021/04/FB_IMG_1606990808786.jpg", days: "4 days & 3 nights" },
    ];
    // Filtered treks
    const filteredTreks = treks.filter(trek => trek.name.toLowerCase().includes(search.toLowerCase()));
    return(<>
   <div className="heading">
    <h1 data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">Himalayan Trek</h1>
   </div>
   <br/>
   {/* Search bar */}
   <div style={{textAlign: 'center', marginBottom: 20}}>
     <input
       type="text"
       placeholder="Search treks..."
       value={search}
       onChange={e => setSearch(e.target.value)}
       style={{padding: 8, width: 250, borderRadius: 4, border: '1px solid #ccc'}}
     />
   </div>
   <div className="container">
    <div className="row">
      {filteredTreks.slice(0,3).map((trek, idx) => (
        <div className="col-lg-4" key={trek.name}>
          <img src={trek.img} height="300px" width="300px"/>
          <h4>{trek.name}</h4>
          <p>{trek.days}</p>
          <button>ENQUIRE NOW</button>
        </div>
      ))}
    </div>
    <div className="row">
      {filteredTreks.slice(3).map((trek, idx) => (
        <div className="col-lg-6" key={trek.name}>
          <img src={trek.img} height="400px" width="400px"/>
          <h4>{trek.name}</h4>
          <p>{trek.days}</p>
          <button>ENQUIRE NOW</button>
        </div>
      ))}
    </div>
   </div>
    </>)
}
export default Trek;