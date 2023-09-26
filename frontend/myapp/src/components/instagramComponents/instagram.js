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

class Instagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Your AI-Generated Ideas Will Shine Right Here',
      response1: '... Await the response',
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
        heading: 'Instagram topics suggestions for: accounting agency',
        response1: `\n 1. The Benefits of Working with an Accounting Agency 
2. Tips for Maximizing Your Business Profits 
3. Strategies for Effective Tax Planning 
4. Understanding Business Financial Statements 
5. Creative Ways to Streamline Bookkeeping Processes`,
        businessName: 'accounting agency',
        targetAudience: 'people who have a business',
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      this.startTypingEffect(this.state.response1);
    } else {
      this.setState({
        value,
        heading: 'Your AI-Generated Ideas Will Shine Right Here',
        response1: '... Await the response',
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

    const { businessName, targetAudience } = this.state;

    if (!businessName || !targetAudience) {
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
        prompt: `generate instagram topics for a chocolate company \nthe audiance are the married people\n\n1. Decadent Chocolatey Date Night Ideas \n2. Chocolate Gift Ideas for Your Loved One\n3. Chocolate Recipes Perfect for Couples \n4.  Create Your Own Chocolatey Treats Together \n\ngenerate instagram topics for a graphic design company \nthe audiance are the business people\n\n1. How to Make Your Business Stand Out with Graphic Design \n2. Showcase Your Brand with Creative Graphics \n3. Tips for Effective Logo Design \n4. Utilizing Graphic Design to Strengthen Your Brand Identity \n5. Creative Ways to Showcase Your Products and Services with Graphics\n\ngenerate instagram topics for a marketing company \nthe audiance are the business people\n\n1. The Benefits of Investing in Digital Marketing \n2. Strategies for Maximizing Your Brand’s Reach \n3. Tips for Creating Engaging Content \n4. Creative Ways to Utilize Social Media for Your Business \n5. Strategies for Building an Effective Marketing Plan\n\n\ngenerate instagram topics for a restaurant\nthe audiance are the women between 18 years old and 22 years old\n\n1. Delicious Recipes Perfect for Young Women \n2. Fun Recipes for Enjoying with Friends \n3. Showcase Your Favorite Restaurant Dishes \n4. Quick and Easy Meals to Fit Your Busy Lifestyle \n5. Tips for Finding Healthy Meals on the Go\n\ngenerate instagram topics for ${businessName}\nthe audiance are ${targetAudience}\n\n`,
        temperature: 0.71,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const responseText = response.data.choices[0].text;

      this.setState({
        heading: `Instagram topics suggestions for: ${businessName}`,
        response1: responseText,
        error: '',
        loading: false,
        typingEffect: '',
        currentCharIndex: 0,
      });

      this.startTypingEffect(responseText);

      // Increment usage in the database
      const idClient = secureLocalStorage.getItem('i');
      const idTool = '1';
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
            <h4>YOUR BUSINESS</h4>
            <TextField
              fullWidth
              value={this.state.businessName}
              label="Type here"
              id="fullWidth"
              name="businessName"
              onChange={this.handleChange}
              required
            />
            <h4>YOUR TARGET AUDIENCE</h4>
            <TextField
              fullWidth
              value={this.state.targetAudience}
              label="Type here"
              id="fullWidth"
              name="targetAudience"
              onChange={this.handleChange}
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

export default Instagram;
