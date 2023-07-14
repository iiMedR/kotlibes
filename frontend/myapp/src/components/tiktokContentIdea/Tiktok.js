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
    }
  };

  render() {
    const { loading, heading, userStatus } = this.state;
    const isAllowedToGenerate = userStatus === 'trial';
    const responseLines = this.state.response1.split('\n');
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
              value={this.state.targetAudience}
              label="Your Target Audience"
              id="fullWidth"
              name="targetAudience"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <button type="submit" disabled={!isAllowedToGenerate}>Generate with AI</button>
          </form>
          <div className="output-tool">
            <Card><CardContent><h4>{heading}</h4>{responseLines.map((line, index) => (<p key={index}>{line}</p>))}</CardContent></Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Tiktok;
