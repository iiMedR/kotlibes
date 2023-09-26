import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import NavbarTool from './NavbarTool';
import Loader from '../Loader';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import secureLocalStorage from "react-secure-storage"
import BaseURL from '../BaseURL';

class Linkedin extends Component {
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

  setValue = async (value) => {
    if (value) {
      this.setState({
        value,
        heading: 'Linkedin content ideas suggestion for Graphic design and websites Developer',
        response1: `\n1. Industry Insight Reports: Create and publish reports that provide an in-depth analysis of the latest trends and developments in the industry. Share your insights and highlight any adjustments businesses need to make in order to remain competitive.
        2. Professional Tips and Advice: Share practical tips, advice, or best practices that aim to help start-ups and small businesses succeed with their projects or initiatives.
        3. Success Stories: Share client success stories and case studies that illustrate how your solutions have helped businesses overcome challenges and achieve success.
        4. Demonstration Videos: Create videos that demonstrate the processes or tools associated with your products and services. These can provide a visual and interactive way to explain complex concepts to your target audience.  
        5. LinkedIn Live Events: Host live online Q&A sessions that allow you to interact with your audience and answer questions they may have about your services or industry.`,
        businessName: 'Graphic design and websites Developer',
        targetAudience: 'companies that need developers and graphic designers',

      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      this.startTypingEffect(this.state.response1);
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
        prompt: `\n\nBusiness Description: ${businessName}\nTarget Audience: ${targetAudience}\nPrompt:\nGenerate 5 engaging content ideas for LinkedIn that will resonate with your target audience and help establish your brand as a thought leader in your industry. The content should be professional, informative, and relevant to the LinkedIn platform.\n\nKey considerations:\n1. Industry Insights and Trends: Share your expertise by providing valuable insights and analysis of the latest trends, news, or developments in your industry. This positions you as a knowledgeable professional and sparks discussions among your connections.\n2. Thought Leadership Articles: Write thought-provoking articles that address challenges, offer solutions, or provide industry-related tips. Showcase your expertise and share actionable advice that your audience can benefit from.\n3. Case Studies or Success Stories: Share real-life examples of how your products or services have helped clients or customers achieve success. Highlight the challenges they faced, the solutions implemented, and the measurable results they obtained.\n4. Professional Tips and Advice: Share practical tips, advice, or best practices that are relevant to your industry or profession. These can range from productivity hacks, career development tips, or insights on improving specific skills.\n5. Engage in Industry Discussions: Participate in LinkedIn groups or industry-related discussions by offering your perspective, asking thoughtful questions, and sharing valuable insights. This helps you build connections, expand your network, and establish your credibility.\n\nPlease generate 5 content ideas that are professional, informative, and engaging for LinkedIn. Consider your target audience's professional interests, industry trends, and the expertise of your business to create content that provides value and encourages engagement and networking on the LinkedIn platform.\n\n`,
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const responseText = response.data.choices[0].text;

      this.setState({
        heading: `5 Linkedin content ideas suggestion for your ${businessName}`,
        response1: responseText,
        error: '',
        loading: false,
        typingEffect: '',
        currentCharIndex: 0,
      });

      this.startTypingEffect(responseText);

      // Increment usage in the database
      const idClient = secureLocalStorage.getItem('i');
      const idTool = '34';
      const currentDate = new Date();
      const usageDate = currentDate.toISOString().split('T')[0];
      //console.log(usageDate)

      const usageData = {
        idClient,
        idTool,
        usageDate,
      };

      axios.post(`${BaseURL}/api/incrementUsage.php`, usageData)
        .then((response) => {
          // Handle the response if necessary
        })
        .catch((error) => {
          console.log(error);
          // Handle the error if necessary
        });
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
            <h4>ABOUT AUDIENCE</h4>
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

export default Linkedin;
