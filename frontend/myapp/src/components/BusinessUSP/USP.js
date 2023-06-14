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

  setValue = async (value) => {
    if (value) {
      this.setState({
        value,
        heading: 'USP suggestion for your Eco-Friendly Cleaning Products',
        response1: `\n Unique Selling Proposition (USP):
        USP 1: Get Cleaner with Eco-Friendly Solutions- Our hand crafted, non-toxic cleaning solutions are formulated from natural and biodegradable ingredients that are safe for your home and the environment.
        USP 2: Enjoy Convenience & Value- Our products are affordable and available online with fast and free shipping across Morocco.
        USP 3:Feel Good about Your Purchases- Not only are our products effective and affordable, but they are also certified for their sustainability and cruelty-free practices, letting you make a difference one purchase at a time.`,
        businessName: 'Eco-Friendly Cleaning Products',
        businessProduct: 'Handcrafted, Non-Toxic Cleaning Solutions',
        compititorsOffers: 'GreenClean: Offers a wide range of eco-friendly cleaning products made from natural and biodegradable ingredients. Their products are free from harsh chemicals and toxins, ensuring a safe and healthy cleaning experience. EarthSparkle: Specializes in plant-based cleaning solutions that are environmentally friendly and cruelty-free. Their products are packaged in recyclable materials and have earned certifications for their sustainability practices.',
        buyerPain: 'Celine finds it difficult to find eco-friendly cleaning products in Morocco that also fit into her budget. She is weary of the numerous chemicals and additives found in conventional cleaning products, and wishes to find an affordable non-toxic alternative',
        buyerBehaviors: 'Celine primarily shops online, preferring the convenience and selection that it provides. She is particular about researching products and services, and will often read reviews and research ingredients before making a purchase. She’s a great advocate for environmental causes and often shares educational content on her social media pages',
        buyerGoals: 'Celine’s primary goal is to be a part of environmental sustainability by living a sustainable lifestyle. She’s always on the lookout for products, services, and businesses that align with this goal',
        buyerMotivation: 'Celine values businesses that prioritize sustainability over profit and whose goals are aligned with her own. She is driven by her goal of environmental sustainability, and she is willing to pay more for eco-friendly products because of her focus on making conscious and informed purchasing decisions',
        buyerOtherD: 'Celine is highly conscious of both the environment and her finances, always looking for ways to balance the two. She believes that everyone should have access to eco-friendly products and is passionate about encouraging others to make a difference, even in small ways',

      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      this.startTypingEffect(this.state.response1);
    } else {
      this.setState({
        value,
        heading: 'Your AI-Generated USP Will Shine Right Here',
        response1: '',
        businessName: '',
        businessProduct: '',
        compititorsOffers: '',
        buyerPain: '',
        buyerBehaviors: '',
        buyerGoals: '',
        buyerMotivation: '',
        buyerOtherD: '',
        typingEffect: '',
        currentCharIndex: 0,
      });

      clearInterval(this.state.typingEffectInterval);
    }
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

    this.setState({ loading: true });

    try {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Business Niche: ${businessName}\nBusiness Product/services: ${businessProduct}\nCompetitors: ${compititorsOffers}\nBuyer Persona: Buyer Pain Points: ${buyerPain}, Buyer Behaviors: ${buyerBehaviors}, Goals & Aspirations: ${buyerGoals}, Motivations & Values: ${buyerMotivation}, Other Relevant Details: ${buyerOtherD}.\n\nPrompt:\nGenerate a compelling Unique Selling Proposition (USP) for my business in the business niche based on their target audience and competitors. The USP should clearly differentiate my business from competitors and communicate the unique value and benefits they offer to their target audience. Consider the buyer persona's pain points, behaviors, goals, other relevant details,and motivations to create a USP that resonates with them and addresses their pain points effectively, make sure to generate it in this form: USP 1-..., USP 2-..., UPS 3-... .\n\nKey considerations:\n1. Analyze Competitors: Review the offerings of key competitors in the business niche. Identify areas where my business can stand out and offer something unique or superior.\n2. Understand Buyer Persona: Consider the needs, preferences, and motivations of ny target audience (as described in the buyer persona). What are their pain points, desires, or challenges that I can address?\n3. Unique Value Proposition: Based on the analysis of competitors and buyer persona, develop a concise and compelling USP that highlights the unique value and benefits my business provides. Focus on what sets them apart and why potential customers should choose them over competitors.\n4. Communicate Benefits: Clearly communicate the specific benefits and advantages that my business offers to their target audience. How can their products/services solve problems or fulfill needs in a unique and valuable way?\n5. Emphasize Differentiation: Highlight the aspects that make my business different and superior to competitors. Whether it's quality, innovation, customer service, or any other unique selling point, emphasize it in the USP.\n\nGenerate a strong and persuasive Unique Selling Proposition that effectively communicates my value proposition, resonates with their target audience, and sets them apart from competitors. Make sure the USP encapsulates the core benefits, addresses the pain points of the buyer persona, and creates a strong reason for potential customers to choose my business.`,
        temperature: 1,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const responseText = response.data.choices[0].text;

      this.setState({
        heading: `USP suggestions for your ${businessName}`,
        response1: responseText,
        error: '',
        loading: false,
        typingEffect: '',
        currentCharIndex: 0,
      });

      this.startTypingEffect(responseText);

    } catch (error) {
      console.log(error);
      this.setState({
        error: 'An error occurred. Please try again.',
        loading: false,
      });
    }
  };

  startTypingEffect = (text, speed = 20) => {
    clearInterval(this.state.typingEffectInterval);

    let charIndex = 0;

    const typingEffectInterval = setInterval(() => {
      if (charIndex <= text.length) {
        this.setState({
          typingEffect: text.substring(0, charIndex),
          currentCharIndex: charIndex,
        });
        charIndex++;
      } else {
        clearInterval(typingEffectInterval);
      }
    }, speed);

    this.setState({ typingEffectInterval });
  };

  render() {
    const { loading, heading, userStatus } = this.state;
    const isAllowedToGenerate = userStatus === 'trial';
    const responseLines = this.state.typingEffect.split('\n');
    return (
      <div>
        <NavbarTool setValue={this.setValue} />
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
            {this.state.error && <p className="err" style={{color: 'red'}}>{this.state.error}</p>}
            <button type="submit" disabled={!isAllowedToGenerate}>Generate with AI</button>
            <Stack className="info"><Alert severity="info">When you click "Generate," it may take a few seconds!</Alert></Stack>
          </form>
          <div className="output-tool">
            <Card><CardContent><h4>{heading}</h4>{responseLines.map((line, index) => (<p key={index}>{line}</p>))}</CardContent></Card>
          </div>
        </div>
        {loading && (
          <div className="loader-overlay">
            <div className="loader1">
              <Loader />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default USP;
