import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import headerImg from "../assets/img/header-img.svg"




const Banner = () =>{
    const[loopNum, setLoopNum]=useState(0);
    const[isDeleting,setIsDeleting]=useState(false);
    const toRotate = ["Kotlibes","your marketer"]
    const [text,setText] = useState('');
    // had delta hya lwe9t bin kol harf o harf b millisecond
    const [delta, setDelta]= useState(300 - Math.random * 100);
    const period=250;

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0 , text.length - 1) : fullText.substring(0 , text.length + 1);
        setText(updatedText);
        if (isDeleting){
            setDelta(prevDelta => prevDelta /2)
        }
        if (!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);
        } else if(isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }
    useEffect(() => {
        let ticker = setInterval(tick, delta);
        return () => clearInterval(ticker);
      }); 



    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">WELCOME TO KOTLIBES</span>
                        <p className="welcoming">{'Hello I am '}<span className="wrap">{text}</span></p>
                        <p className="welcometxt">Streamline your marketing with our AI-powered assistant. Generate effective strategies and creative content ideas with ease.<br/> Save time, get data-driven results, and stay ahead of the game.</p>
                        <Link to="/login"
                              className="vvd1"
                              onClick={() => console.log('connect')}
                        >
                        <button> Try Kotlibes now! <ArrowRightCircle size={25}/></button>
                        </Link>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img className="headerImg" src={headerImg} alt="Header Img"></img>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}
export default Banner;