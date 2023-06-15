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

  setValue = async (value) => {
    if (value) {
      this.setState({
        value,
        heading: 'Buyer Persona suggestion for your Eco-Friendly Cleaning Products',
        response1: `\n Meet Celine: 

        Demographics: 
        Celine is a 25-year old single female living in Morocco. She works as a customer service representative and earns a monthly salary of 600$.  
        
        Interests & Hobbies: 
        In her free time, Celine enjoys reading books about environmental sustainability, going for walks in nature, and trying out new vegan recipes with friends. She is also an avid follower of health-related Instagram pages. 
        
        Behaviors: 
        Celine primarily shops online, preferring the convenience and selection that it provides. She is particular about researching products and services, and will often read reviews and research ingredients before making a purchase. She’s a great advocate for environmental causes and often shares educational content on her social media pages. 
        
        Goals & Aspirations: 
        Celine’s primary goal is to be a part of environmental sustainability by living a sustainable lifestyle. She’s always on the lookout for products, services, and businesses that align with this goal. 
        
        Challenges & Pain Points: 
        Celine finds it difficult to find eco-friendly cleaning products in Morocco that also fit into her budget. She is weary of the numerous chemicals and additives found in conventional cleaning products, and wishes to find an affordable non-toxic alternative.
        
        Motivations & Values: 
        Celine values businesses that prioritize sustainability over profit and whose goals are aligned with her own. She is driven by her goal of environmental sustainability, and she is willing to pay more for eco-friendly products because of her focus on making conscious and informed purchasing decisions. 
        
        Communication Preferences: 
        Celine is active on social media platforms, regularly reading and responding to posts that are relevant to her interests. She prefers receiving communications via email, keeping her social media accounts more personal. 
        
        Other Relevant Details: 
        Celine is highly conscious of both the environment and her finances, always looking for ways to balance the two. She believes that everyone should have access to eco-friendly products and is passionate about encouraging others to make a difference, even in small ways. 
        
        Percentage of this kind of people in the market location:
        Celine is part of an emerging market of people in Morocco and Spain that are passionate about living a sustainable lifestyle. This type of consumer makes up around 5-10% of the population.`,
        businessName: 'Eco-Friendly Cleaning Products',
        marketLocation: 'Morocco, Spain',
        businessProduct: 'Handcrafted, Non-Toxic Cleaning Solutions',
        productCost: '16$',
        lowestIncome: '<200$',
        normalIncome: '>600',
        luxuryIncome: '>10k$',
        USP: 'Sustainable Sourcing, Plastic-Free Packaging, Natural Ingredients',

      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      this.startTypingEffect(this.state.response1);
    } else {
      this.setState({
        value,
        heading: 'Your AI-Generated Persona Will Shine Right Here',
        response1: '',
        businessName: '',
        marketLocation: '',
        businessProduct: '',
        productCost: '',
        lowestIncome: '',
        normalIncome: '',
        luxuryIncome: '',
        USP: '',
        typingEffect: '',
        currentCharIndex: 0,
      });

      clearInterval(this.state.typingEffectInterval);
    }
  };

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

      const responseText = response.data.choices[0].text;

      this.setState({
        heading: `Buyer Persona suggestion for your ${businessName}`,
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
    const {
      loading,
      heading,
      typingEffect,
      userStatus,
    } = this.state;

    const isAllowedToGenerate = userStatus === 'trial';
    const responseLines = typingEffect.split('\n');

    return (
      <div>
        <NavbarTool setValue={this.setValue} />

        <div className="inputOutput">
          <form onSubmit={this.onFormSubmit} className="inputs-tool">
            <Stack className="info">
              <Alert severity="info">
                When you click "Generate," it may take a few seconds!
              </Alert>
            </Stack>
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
            {this.state.error && <p className="err" style={{color: 'red'}}>{this.state.error}</p>}
            <button type="submit" disabled={!isAllowedToGenerate}>Generate with AI</button>
          </form>

          <div className="output-tool">
            <Card>
              <CardContent>
                <h4>{heading}</h4>
                {responseLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </CardContent>
            </Card>
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

export default BuyerP;
