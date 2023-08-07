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
      heading: 'Your AI-Generated Post Will Shine Right Here',
      response1: '',
      error: '',
      value: false,

      businessName: '',
      businessNich: '',
      title: '',
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

    const { businessName, businessNich, title, targetAudience} = this.state;

    if ( !businessName || !businessNich || !title || !targetAudience ) {
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
        prompt: `\n\nTitle: ${title}\n\nDescription: ${businessName} catering to ${targetAudience} in the ${businessNich}. They aim to provide valuable and engaging content to their audience on Instagram to increase brand awareness and foster meaningful connections. The goal of this post is to educate, entertain, and engage the audience without directly selling. The content should be informative, interesting, or fun to read, and each slide should contain visually appealing content that aligns with the client's niche.\n\nGoal: Strengthening the presence of our brand in this nich: ${businessNich}\n\nPrompt: Create a series of slides for an Instagram news feed post that will captivate the audience's attention and encourage engagement. The first slide should contain an attention-grabbing element, such as a thought-provoking question or sharing fascinating facts related to the niche that the audience might not be aware of. The subsequent slides should provide educational or entertaining content that adds value to the audience's knowledge or brings joy to their day. Remember to include visually appealing content that aligns with the niche, ensuring the text is easy to read.\n\nThe call-to-action should be placed in the last slide, encouraging the audience to take action, such as leaving a comment, tagging a friend, or visiting the client's website for more information. And in the end make a description accompanying the post should provide context, engage the audience, and include related hashtags to increase discoverability.\n\nPlease note that while generating the content for each slide, focus on creating engagement, providing valuable information, and maintaining a consistent tone that resonates with the target audience. Avoid direct sales pitches, and instead aim to build brand awareness and foster a sense of community among the audience.\n\nbased on this form\n\nSlide 1: ...\n\nSlide 2: ...\n\nSlide 3: ...\n\nSlide 4: ...\n\nSlide 5: ...\n\nSlide 6: ...\n\nSlide 7: ...\n\nSlide 8: Call-to-action: ...\n\nDescription: ...\n\n(you can use more that 5 slides)\n\n`,
        temperature: 1,
        max_tokens: 1000,
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
              value={this.state.businessNich}
              label="Your Business Nich"
              id="fullWidth"
              name="businessNich"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.title}
              label="Your Post Title"
              id="fullWidth"
              name="title"
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
          </div>
        </div>
      </div>
    );
  }
}

export default EmailLeads;
