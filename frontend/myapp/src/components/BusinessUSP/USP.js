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

class USP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Your AI-Generated USP Will Shine Right Here',
      response1: '',
      error: '',
      value: false,

      businessName: '',
      businessProduct: '',
      compititorsOffers: '',
      buyerPain: '',
      buyerBehaviors: '',
      buyerGoals: '',
      buyerMotivation: '',
      buyerOtherD: '',
      
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

    if (this.state.userStatus !== 'trial' || this.state.userStatus !== 'premium' || this.state.userStatus !== 'platinum') {
      this.setState({ error: 'You do not have permission to generate using this tool.' });
      return;
    }

    const { businessName, buyerBehaviors, compititorsOffers, buyerPain, buyerGoals, buyerMotivation, buyerOtherD, businessProduct } = this.state;

    if (!businessName || !buyerBehaviors || !compititorsOffers || !buyerPain || !buyerGoals || !buyerMotivation || !buyerOtherD || !businessProduct ) {
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
              name="businessName"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.compititorsOffers}
              label="Your Market Compititor offers"
              multiline
              maxRows={6}
              id="fullWidth"
              name="compititorsOffers"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <h4>ABOUT YOUR BUYER PERSONA</h4>
            <TextField
              fullWidth
              value={this.state.buyerPain}
              label="Your Buyer Pain Points"
              multiline
              maxRows={5}
              id="fullWidth"
              name="buyerPain"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.buyerBehaviors}
              label="Your Buyer Beheviors"
              multiline
              maxRows={5}
              id="fullWidth"
              name="buyerBehaviors"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.buyerGoals}
              label="Your Buyer Goals & Aspirations"
              multiline
              maxRows={4}
              id="fullWidth"
              name="buyerGoals"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.buyerMotivation}
              label="Your Buyer Motivations & Values"
              multiline
              maxRows={4}
              id="fullWidth"
              name="buyerMotivation"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.buyerOtherD}
              label="Your Buyer Other Relevant Details"
              multiline
              maxRows={4}
              id="fullWidth"
              name="buyerOtherD"
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

export default USP;
