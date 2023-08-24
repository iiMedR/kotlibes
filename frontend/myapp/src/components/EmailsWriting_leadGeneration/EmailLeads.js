import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import NavbarTool from './NavbarTool';
import Loader from '../Loader';
import { Configuration, OpenAIApi } from 'openai';
import secureLocalStorage from "react-secure-storage"

class EmailLeads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Your AI-Generated Email Will Shine Right Here',
      response1: '',
      error: '',
      value: false,

      name: '',
      businessName: '',
      businessProduct: '',
      businessExperience: '',
      businessNich: '',
      targetAudience: '',
      audiencePain: '',
      audienceNeeds: '',
      USP: '',
      businessFeatures:'',
      businessAdventages:'',
      
      loading: false,
      typingEffect: '',
      currentCharIndex: 0,
      typingEffectInterval: null,
      userStatus: '', // New state property for user status
    };
  }

  componentDidMount() {
    const status = secureLocalStorage.getItem('pl'); // Change to the actual key
    this.setState({ userStatus: status });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { loading, heading, userStatus } = this.state;
    const isAllowedToGenerate = userStatus === 'trial';
    return (
      <div>
        <NavbarTool />
        <div className="inputOutput">
          <form className="inputs-tool">
            <h4>ABOUT YOUR BUSINESS</h4>
            <TextField
              fullWidth
              value={this.state.businessName}
              label="Describe Your Business"
              id="fullWidth"
              name="businessName"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.name}
              label="Your Business Name"
              id="fullWidth"
              name="name"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessProduct}
              label="Your Products/Services"
              id="fullWidth"
              name="businessProduct"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessExperience}
              label="Unique Features/Benifites"
              id="fullWidth"
              name="businessExperience"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessNich}
              label="Your Industry/Nich"
              id="fullWidth"
              name="businessNich"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessFeatures}
              label="Your Unique Features"
              id="fullWidth"
              name="businessFeatures"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
          </form>
          <div className="output-tool">
          </div>
        </div>
      </div>
    );
  }
}

export default EmailLeads;
