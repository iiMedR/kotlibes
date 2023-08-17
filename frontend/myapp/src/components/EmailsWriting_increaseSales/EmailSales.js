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

class EmailSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Your AI-Generated Email Will Shine Right Here',
      response1: '',
      error: '',
      value: false,
      businessName: '',
      businessProduct: '',
      businessFeature: '',
      targetAudience: '',
      audienceChar: '',
      audiencePain: '',
      audienceNeeds: '',
      USP: '',
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

  onFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.userStatus !== 'trial') {
      this.setState({ error: 'You do not have permission to generate using this tool.' });
      return;
    }

    const { businessName, targetAudience, businessProduct, businessFeature, audienceChar, audiencePain, audienceNeeds, USP } = this.state;

    if (!businessName || !targetAudience || !businessProduct || !businessFeature || !audienceChar || !audiencePain || !audienceNeeds || !USP) {
      this.setState({ error: 'Both inputs are required' });
      return;
    }

  };

  render() {
    const { loading, heading, userStatus } = this.state;
    const isAllowedToGenerate = userStatus === 'trial';
    return (
      <div>
        <NavbarTool />
        <div className="inputOutput">
          <form onSubmit={this.onFormSubmit} className="inputs-tool">
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
              value={this.state.businessFeature}
              label="Unique Features/Benifites"
              id="fullWidth"
              name="businessFeature"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.targetAudience}
              label="Your Target Audience"
              id="fullWidth"
              name="targetAudience"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.audienceChar}
              label="Audience Characteristics"
              id="fullWidth"
              name="audienceChar"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.audiencePain}
              label="Pain Points"
              multiline
              maxRows={4}
              id="fullWidth"
              name="audiencePain"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.audienceNeeds}
              label="Audience Needs/Solutions"
              multiline
              maxRows={4}
              id="fullWidth"
              name="audienceNeeds"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.USP}
              label="Your USP"
              multiline
              maxRows={4}
              id="fullWidth"
              name="USP"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <button type="submit" disabled={!isAllowedToGenerate}>Generate with AI</button>
          </form>
          <div className="output-tool">
          </div>
        </div>
      </div>
    );
  }
}

export default EmailSales;
