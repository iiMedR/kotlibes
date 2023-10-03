import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import BaseURL from './BaseURL';

function Footer() {

    const [email, setEmail] = useState({});
    const [error, setError] = useState("");
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value)
        setEmail(values => ({...values, [name]: value}));

          // Check if the input field is empty
            if(value === ""){
                setError(prevErrors => ({...prevErrors, [name]: "This field is required"}))
            } else {
                setError(prevErrors => ({...prevErrors, [name]: ""}))
            }
        
            // Check if the input field has a certain pattern
            if(name === "email" && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                setError(prevErrors => ({...prevErrors, [name]: "Invalid email address"}))
            }
            } 


            const handleSubmit = async (event) => {
                event.preventDefault();
                // check if there are any errors bach ida kano matdozch submit
                const hasErrors = Object.values(error).some(error => error !== "");
                if (hasErrors) {
                    console.log("Please fix the errors before submitting the form.");
                    return;
                }
                try {
                    //const response = await axios.post("https://kotlibes.000webhostapp.com/Linkpi/newsletter.php", email);
                    const response = await axios.post(`${BaseURL}/api/newsletter.php`, email);
                    if (response.data.status === 0) {
                        setError(response.data.message);
                    } else {
                        setError("");
                        console.log("Record created successfully.");
                        setEmail({});

                    }
                } catch (error) {
                    console.log(error);
                    setError("Something went wrong, please try again later.")
                }
            };

  return (
    <>
        <div className='mainFooter'>
            <div className='footerContainer'>
                <div className='footerRow'>
                    {/*Column 1*/}
                    <div className='footerCol'>
                        <h4>Marketing Solutions</h4>

                        <ul className='list-unstyled'>
                            <li><Link to='blog/SMM-Studio'>SMM Studio</Link></li>
                            <li><Link to='blog/Strategic-growth-suite'>Strategic Growth Suite</Link></li>
                            <li><Link to='blog/Advertising-Toolkit'>Advertising Toolkit</Link></li>
                            <li><Link to='blog/Emails-Toolkit'>Emails Toolkit</Link></li>
                            <li><Link to='blog/SEO-Toolbox'>SEO Toolbox</Link></li>
                            <li><Link to='blog/relationships-handler'>Relationships Handler</Link></li>
                            <li><Link to='blog/Products-Toolkit'>Products Toolkit</Link></li>
                        </ul>
                    </div>
                    {/*Column 2*/}
                    <div className='footerCol'>
                        <h4>Company</h4>

                        <ul className='list-unstyled'>
                            <li><Link to='blog'>Blog</Link></li>
                            <li><Link to='about'>About</Link></li>
                            <li><Link to='our-customers'>Our Customers</Link></li>
                        </ul>
                    </div>
                    {/*Column 3*/}
                    <div className='footerCol'>
                        <h4>Support</h4>

                        <ul className='list-unstyled'>
                            <li><Link to='pricing'>Pricing</Link></li>
                            <li><Link to='help'>Help Guids</Link></li>
                            <li><Link to='affiliate-program'>Affiliate Program</Link></li>
                        </ul>
                    </div>
                    {/*Column 4*/}
                    <div className='footerCol'>
                        <h4>Newsletter</h4>
                        <form onSubmit={handleSubmit}>
                            <ul className='list-unstyled'>
                                
                                <li><p>Subscribe to our newsletter to get your weekly dose of news, updates,tips and special offers</p></li>
                                <li><div className='footer-email'>
                                    <input type="email" name='email' placeholder="Enter your email" class="email-input" onChange={handleChange}></input>
                                    


                                </div></li>
                                <li><button>Subscribe</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
                <hr />
                <div className='footerRow'>
                    <p className='footerCol-r'>
                        &copy; {new Date().getFullYear()} KOTLIBES | All Rights Reserved
                    </p>
                    <p className='footerCol-sm'>
                        <p><a href='https://www.instagram.com/kotlibes/' rel="noreferrer" target="_blank">Instagram</a></p> | <p><Link to='https://www.twitter.com' rel="noreferrer" target="_blank">Twitter</Link></p> | <p><Link to='https://www.tiktok.com' rel="noreferrer" target="_blank">Tiktok</Link></p>
                    </p>
                </div>
            </div>
        </div>
    </>


  )
}

export default Footer