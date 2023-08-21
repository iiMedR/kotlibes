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

  setValue = async (value) => {
    if (value) {
      this.setState({
        value,
        heading: 'Email suggestion for your Fitness Club',
        response1: `\n Subject Line: Invest in Your Fitness. Unlock Your Fitness Potential at Our Club!
        
        
        Dear Fitness Enthusiast,
        
        Are you looking to unlock your full fitness potential? Do you want to find a supportive and motivating fitness environment that caters to your individual needs?
        
        Look no further than our Fitness Club! We understand the needs of each and every one of our customers. We are passionate about helping you reach your fitness goals and realize your full potential. We offer an array of fitness classes and personal training sessions that are tailored to fit your needs and goals. Plus, you will have access to state-of-the-art equipment and certified trainers who will provide personalized attention and support.
        
        Our club will provide you with an unparalleled fitness experience and a vibrant community to keep you motivated! We also offer flexible membership options that will be sure to match your budget.
        
        This is a once in a lifetime opportunity to invest in your fitness and greatly improve your physical and mental wellbeing. We have a great limited-time offer on our memberships, now is the time to take advantage of it!
        
        Join our club today and take your fitness to the next level. Click the link below to learn more about our offerings and take the first step towards achieving your fitness goals.
        
        We look forward to seeing you at our club!
        
        Sincerely,
        
        The Fitness Club Team`,
        businessName: 'Fitness Club',
        businessProduct: 'fitness classes and personal training sessions',
        businessFeature: 'state-of-the-art equipment and certified trainers',
        targetAudience: 'fitness enthusiasts',
        audienceChar: 'dedicated to improving their physical fitness, regardless of their current fitness level',
        audiencePain: 'struggling to find a supportive and motivating fitness environment that caters to their individual needs',
        audienceNeeds: 'a fitness club that offers a variety of classes to challenge and inspire them, personalized attention from knowledgeable trainers, and a sense of community to stay motivated throughout their fitness journey',
        USP: 'providing personalized training programs, a vibrant community, and flexible membership options',

      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      this.startTypingEffect(this.state.response1);
    } else {
      this.setState({
        value,
        heading: 'Your AI-Generated Email Will Shine Right Here',
        response1: '',
        businessName: '',
        businessProduct: '',
        businessFeature: '',
        targetAudience: '',
        audienceChar: '',
        audiencePain: '',
        audienceNeeds: '',
        USP: '',
        typingEffect: '',
        currentCharIndex: 0,
      });

      clearInterval(this.state.typingEffectInterval);
    }
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

    this.setState({ loading: true });

    try {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `\n\nOur client is a ${businessName} that offers ${businessProduct} to ${targetAudience}. They provide ${businessFeature} that set them apart from competitors and deliver exceptional value to customers.\n\nTarget Audience:\n\nThe target audience consists of ${targetAudience}, who are ${audienceChar} and ${audiencePain}. They are seeking ${audienceNeeds} and are motivated to make a purchase.\n\nUnique Selling Proposition (USP):\n\nOur client's Unique Selling Proposition is ${USP}. It differentiates them from competitors and positions them as the preferred choice.\n\nGoal:\n\nThe goal of this email marketing campaign is to increase sales by compelling recipients to take action and make a purchase. The email should emphasize the value, benefits, and unique aspects of our client's offerings, driving recipients to make a buying decision.\n\nPrompt:\n\nGenerate an engaging and persuasive email marketing copy that captures the attention of our target audience and encourages them to take action. The email should highlight the unique selling proposition of our client's products/services and clearly communicate the value and benefits they provide. Focus on creating a sense of urgency, showcasing any limited-time offers or promotions, and including a clear call-to-action that prompts recipients to make a purchase.\n\nPlease note that the generated email should be well-crafted, persuasive, and optimized for driving sales conversions. It should be customer-centric, addressing the pain points, desires, and motivations of our target audience while effectively communicating the value proposition of our client's offerings.`,
        temperature: 0.75,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const responseText = response.data.choices[0].text;

      this.setState({
        heading: `Email suggestion for your ${businessName}`,
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

export default EmailSales;
