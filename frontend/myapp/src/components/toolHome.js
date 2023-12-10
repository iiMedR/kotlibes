import Card from 'react-bootstrap/Card';
import React , {useRef} from 'react'
import { Link } from 'react-router-dom';
//import { Paper } from '@mui/material';
import '../App.css';
//import secureLocalStorage from 'react-secure-storage';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



function ToolHome() {
  const scrollSectionIntoView = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sgsSectionRef = useRef(null);
  const smmSectionRef = useRef(null);
  const emailSectionRef = useRef(null);
  const adGeniusSectionRef = useRef(null);
  const seoSectionRef = useRef(null);
  const customerCommSectionRef = useRef(null);
  return (
    <div className='toolhome'>
      <div className='bar'>
        <ButtonGroup size="sm" aria-label="bargroup" className='bargroup'>
          <Button className='toolhomeBTN' onClick={() => scrollSectionIntoView(sgsSectionRef)}>Strategic Growth Suite</Button>
          <Button className='toolhomeBTN' onClick={() => scrollSectionIntoView(smmSectionRef)}>SMM Studio</Button>
          <Button className='toolhomeBTN' onClick={() => scrollSectionIntoView(emailSectionRef)}>Email Marketing</Button>
          <Button className='toolhomeBTN' onClick={() => scrollSectionIntoView(adGeniusSectionRef)}>AdGenius Toolkit</Button>
          <Button className='toolhomeBTN' onClick={() => scrollSectionIntoView(seoSectionRef)}>SEO Toolbox</Button>
          <Button className='toolhomeBTN' onClick={() => scrollSectionIntoView(customerCommSectionRef)}>Customer Communication</Button>
        </ButtonGroup>
      </div>
      <h1 id='ttl' ref={sgsSectionRef}>Strategic Growth Suite 📈🚀</h1>
      <div className='containerr'>
        <Link id="sidebare-link" to="./marketing-strategy">
          <Card className='toolcard'>
            <Card.Body>
              <h6>Strategic growth suite</h6>
              <Card.Title>Marketing Strategy</Card.Title>
              <Card.Text className='cardDesc'>
                a small description about the tool, and what it can provide to u.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <Link id="sidebare-link" to="./buyer-persona">
          <Card className='toolcard'>
            <Card.Body>
              <h6>Strategic growth suite</h6>
              <Card.Title>Buyer Persona</Card.Title>
              <Card.Text className='cardDesc'>
                a small description about the tool, and what it can provide to u.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <Link id="sidebare-link" to="./usp-generator">
          <Card className='toolcard'>
            <Card.Body>
              <h6>Strategic growth suite</h6>
              <Card.Title>USP</Card.Title>
              <Card.Text className='cardDesc'>
                a small description about the tool, and what it can provide to u.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <Link id="sidebare-link" to="./Marketing-Roadmap">
          <Card className='toolcard'>
            <Card.Body>
              <h6>Strategic growth suite</h6>
              <Card.Title>Marketing Roadmap</Card.Title>
              <Card.Text className='cardDesc'>
                a small description about the tool, and what it can provide to u.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>

      <h1 id='ttl' ref={smmSectionRef}>SMM Studio 📱🎥</h1>
      <div className='containerr'>
        <Link id="sidebare-link" to="./instagram-content-ideas">
          <Card className='toolcard' >
            <Card.Body>
            <h6>SMM Studio</h6>
              <Card.Title>Instagram Content Ideas</Card.Title>
              <Card.Text className='cardDesc'>
                generate some content ideas to increase your instagram engagement. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <Link id="sidebare-link" to="./tiktok-content-ideas">
          <Card className='toolcard' >
            <Card.Body>
            <h6>SMM Studio</h6>
              <Card.Title>Tiktok Content Ideas</Card.Title>
              <Card.Text className='cardDesc'>
                generate some content ideas to increase your Tiktok engagement. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <Link id="sidebare-link" to="./linkedin-content-ideas">
          <Card className='toolcard' >
            <Card.Body>
            <h6>SMM Studio</h6>
              <Card.Title>Linkedin Content Ideas</Card.Title>
              <Card.Text className='cardDesc'>
                generate some content ideas to increase your Linkedin engagement. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <Link id="sidebare-link" to="./instagram-post-Scripts">
          <Card className='toolcard' >
            <Card.Body>
            <h6>SMM Studio</h6>
              <Card.Title>Instagram Post Script</Card.Title>
              <Card.Text className='cardDesc'>
                Instantly generate captivating Instagram post scripts for maximum engagement and social media success.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>

    </div>
  )
}

export default ToolHome