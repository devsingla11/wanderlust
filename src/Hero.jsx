import "./HeroStyles.css";

function Hero(props) {
    return(<>
     <div className={props.cName}>
         <img data-aos="fade-left" alt="herpimg" src={props.herpimg}/>
          <div className="hero-text">
            <h1 data-aos="flip-left">{props.title}</h1>
            <h3 data-aos="flip-left">{props.text}</h3>
            <a href={props.url} className={props.btnclass}> 
              {props.buttonText}
            </a>
          </div>
          </div>
    </>)
}
export default Hero;