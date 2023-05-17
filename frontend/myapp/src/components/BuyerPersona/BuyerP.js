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

    this.setState({ loading: true });

    try {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `\n\nPrompt:\nGenerate a detailed buyer persona for a target customer of ${businessName} in this market location: ${marketLocation}. This buyer persona should represent an ideal customer who is likely to engage and buy ${businessProduct} with average product cost ${productCost}, The lowest individual income/month for a difficult life in the market location is: ${lowestIncome}, Individual minimum income/month for a normal life in the market location is: ${normalIncome}, Individual minimum income/month for a life of luxury in the market location is: ${luxuryIncome}. Provide information about their demographics, interests, behaviors, goals, challenges, and motivations. Include specific details that will help guide marketing strategies and communication approaches to effectively engage and attract this target audience.Our Unique Selling Proposition is ${USP}.\n\nInformation to include:\n1. Demographics: Age, gender, income level, occupation, marital status, etc.\n2. Interests and Hobbies: What are their hobbies, interests, and activities they enjoy in their free time?\n3. Behaviors: How do they typically behave as consumers? Where do they shop? How do they research products/services?\n4. Goals and Aspirations: What are their primary goals and aspirations related to your business/niche? What are they trying to achieve?\n5. Challenges and Pain Points: What challenges or problems do they face that your products/services can address? What frustrates them?\n6. Motivations and Values: What motivates them to make purchasing decisions? What values or beliefs are important to them?\n7. Communication Preferences: How do they prefer to receive information and interact with brands? Are they active on social media or prefer email communications?\n8. Other Relevant Details: Include any other relevant information that will help create a well-rounded and accurate representation of your target customer.\n9. The percentage of this kind of people in my market location.\n\nRemember to focus on creating a persona that aligns with your business and target audience. The generated buyer persona will provide valuable insights into your customers' needs, preferences, and behaviors, enabling you to tailor your marketing strategies to effectively engage and attract them.\n`,
        temperature: 0.75,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

    } catch (error) {
      console.log(error);
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
