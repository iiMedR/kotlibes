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
    </div>
  )
}

export default ToolHome