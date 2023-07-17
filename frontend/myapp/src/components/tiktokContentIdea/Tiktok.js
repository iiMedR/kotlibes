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

class Tiktok extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Your AI-Generated content Will Shine Right Here',
      response1: '',
      error: '',
      value: false,

      businessName: '',
      targetAudience: '',
      
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
        heading: '5 Tiktok content ideas suggestion for your Candle project',
        response1: `\n1. DIY Candle Hacks: Create entertaining videos that demonstrate unusual ways to use candles, such as for setting the mood or crafting unique decor pieces.
        2. Candle Making Tutorials: Teach people the fundamentals of candle making by demonstrating the steps or offering helpful tips.
        3. Candle Making Challenges: Invent an interesting challenge related to your candle making business and encourage people to participate.
        4. Behind the Scenes of a Candle Maker: Share a behind-the-scenes look into the creative process of making candles, from conception to perfect product.
        5. DIY Candle Challenge: Set a challenge for your followers to create a unique candle using resources from around their home. Feature different creations and encourage others to participate in the challenge.`,
        businessName: 'Candle making project',
        targetAudience: 'DIY enthusiasts and home decor lovers and home decoration lovers',

      });

      await new Promise((resolve) => setTimeout(resolve, 500));

    } else {
      this.setState({
        value,
        heading: 'Your AI-Generated content ideas Will Shine Right Here',
        response1: '',

        businessName: '',
        targetAudience: '',

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
    
    const { businessName, targetAudience} = this.state;

    if ( !businessName || !targetAudience ) {
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
        prompt: `\n\nBusiness Description: ${businessName}\nTarget Audience: ${targetAudience}\n\nPrompt:\nGenerate 5 engaging topic ideas for TikTok content that will resonate with your target audience and have the potential to go viral. The content should be creative, entertaining, and aligned with your business. Consider trends, challenges, storytelling, or any other engaging formats that are popular on TikTok.\n\nKey considerations:\n1. Trending Challenges: Identify popular challenges on TikTok that are relevant to your business or niche. Brainstorm creative ways to participate in these challenges while incorporating your brand or products/services.\n2. Behind-the-Scenes: Share behind-the-scenes footage or processes of your business. Give your audience a glimpse into your day-to-day operations, product creation, or event preparation. This can create curiosity and humanize your brand.\n3. User-Generated Content: Encourage your audience to create and share content related to your business. This could include unboxing videos, product reviews, or creative ways to use your products/services. Engage with and feature user-generated content to foster a sense of community.\n4. Educational or How-to Videos: Share informative and educational content related to your business. Teach your audience something new, provide tips and tricks, or demonstrate DIY projects that align with your niche. This can establish you as an authority and provide value to your audience.\n5. Humorous and Entertaining Content: Create light-hearted and entertaining videos that relate to your business or industry. Incorporate humor, skits, or storytelling to captivate your audience and leave a lasting impression. Remember to keep it fun and engaging.\n\nPlease generate 5 topic ideas that are engaging, creative, and have the potential to go viral on TikTok. Consider your target audience's interests, TikTok trends, and the unique aspects of your business to create compelling content that resonates with viewers and encourages sharing and engagement.\n\n`,
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const responseText = response.data.choices[0].text;

      this.setState({
        heading: `5 Tiktok content ideas suggestion for your ${businessName}`,
        response1: responseText,
        error: '',
        loading: false,
        typingEffect: '',
        currentCharIndex: 0,
      });


    } catch (error) {
      console.log(error);
      this.setState({
        error: 'An error occurred. Please try again.',
        loading: false,
      });
    }
  };

  render() {
    const { loading, heading, userStatus } = this.state;
    const isAllowedToGenerate = userStatus === 'trial';
    const responseLines = this.state.response1.split('\n');
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
              value={this.state.targetAudience}
              label="Your Target Audience"
              id="fullWidth"
              name="targetAudience"
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

export default Tiktok;
