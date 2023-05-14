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

class BuyerP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Your AI-Generated Persona Will Shine Right Here',
      response1: '',
      error: '',
      value: false,

      businessName: '',
      marketLocation: '',
      businessProduct: '',
      productCost: '',
      lowestIncome: '',
      normalIncome: '',
      luxuryIncome: '',
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

    const { businessName, productCost, marketLocation, businessProduct, lowestIncome, normalIncome, luxuryIncome, USP } = this.state;

    if (!businessName || !productCost || !marketLocation || !businessProduct || !lowestIncome || !normalIncome || !luxuryIncome || !USP) {
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
              value={this.state.productCost}
              label="Your Product Cost"
              id="fullWidth"
              name="productCost"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.USP}
              label="Your Key Factors That Make You Stand Out"
              multiline
              maxRows={4}
              id="fullWidth"
              name="USP"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <h4>ABOUT MARKET</h4>
            <TextField
              fullWidth
              value={this.state.marketLocation}
              label="Your Market Location"
              id="fullWidth"
              name="marketLocation"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.lowestIncome}
              label="Your Market Lowest Income per Month (Hard Life)"
              id="fullWidth"
              name="lowestIncome"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.normalIncome}
              label="Your Market Normal Income per Month (Good Life)"
              multiline
              maxRows={4}
              id="fullWidth"
              name="normalIncome"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.luxuryIncome}
              label="Your Market Best Income per Month (Luxury Life)"
              multiline
              maxRows={4}
              id="fullWidth"
              name="luxuryIncome"
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

export default BuyerP;
