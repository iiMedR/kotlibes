import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import meter1 from "../assets/img/meter1.png";
import meter2 from "../assets/img/meter2.png";
import meter3 from "../assets/img/meter3.png";
import meter4 from "../assets/img/meter4.png";
import meter5 from "../assets/img/meter5.png";
//import colorSharp from "../assets/img/color-sharp.png";


const Multicarousel = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
    return (
        <section className="skill" id="skills">
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>
                            Marketing Solutions
                            </h2>
                            <p className="salam">We offer a range of marketing tools and services to help businesses achieve their goals, including social media content creation, email marketing toolkit, strategic growth suite, SEO optimization, relationships handler, and more. Let us help take your business to the next level.</p>
                            <Carousel responsive={responsive} infinite={true} className="skill-slider" arrows={false} showDots={false} autoPlay={true} autoPlaySpeed={2000}>
                                <div className="item">
                                    <img src={meter1} alt="imge"/>
                                    <h5>EMAILS</h5>
                                </div>
                                <div className="item">
                                    <img src={meter2} alt="imge"/>
                                    <h5>SMM STUDIO</h5>
                                    
                                </div>
                                <div className="item">
                                    <img src={meter3} alt="imge"/>
                                    <h5>ADGENIUS TOOLKIT</h5>
                                    
                                </div>
                                <div className="item">
                                    <img src={meter4} alt="imge"/>
                                    <h5>CREATIVE WRITING</h5>
                                    
                                </div>
                                <div className="item">
                                    <img src={meter5} alt="imge"/>
                                    <h5>SEO</h5>
                                    
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/*<img className="backgroung-image-left" alt="imge" src={colorSharp} />*/}
        </section>
    )
}
export default Multicarousel;