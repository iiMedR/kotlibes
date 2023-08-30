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
      heading: 'Your AI-Generated Email Will Shine Right Here',
      response1: '',
      error: '',
      value: false,

      name: '',
      businessName: '',
      businessProduct: '',
      businessExperience: '',
      businessNich: '',
      targetAudience: '',
      audiencePain: '',
      audienceNeeds: '',
      USP: '',
      businessFeatures:'',
      businessAdventages:'',
      
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
        heading: 'Email suggestion for your foods restaurant',
        response1: `\n Subject Line: Satisfy Your Cravings with Delicious Bites

        Body Text:
        
        Are you tired of mediocre food options and craving something delicious and unique? Look no further! Delicious Bites offers the perfect solution to satisfy your cravings. Our gourmet pizzas and handcrafted burgers are made with fresh and locally sourced ingredients.
        
        We understand that flavor is paramount, which is why our chefs have crafted an extensive menu with creative combinations of seasonal specials. Our menu offers something for everyone, guaranteeing you will find something to tantalize your taste buds. Whether you are looking for a new favorite or something to tantalize your taste buds, Delicious Bites is sure to have something to satisfy your cravings.
        
        Experience the exceptional quality and taste that Delicious Bites has to offer. Request more details today and learn more about our delectable menu and amazing creations crafted by our expert chefs. Satisfy your cravings and join us at Delicious Bites today.
        
        Sincerely,
        
        Delicious Bites Team`,
        businessName: 'Foods restaurant',
        name: 'Delicious Bites',
        businessProduct: 'Gourmet Pizzas and Handcrafted Burgers',
        businessExperience: 'With over a decade of culinary expertise',
        businessNich: 'Casual Dining',
        targetAudience: 'Food enthusiasts and families',
        audiencePain: 'Tired of mediocre food options',
        audienceNeeds: 'Craving delicious and unique flavor combinations',
        USP: 'Fresh and Locally Sourced Ingredients, Creative Menu Innovation',
        businessFeatures:'Signature Pizzas, Artisanal Burgers, Seasonal Specials',
        businessAdventages:'Flavorful creations crafted by expert chefs, Exceptional quality and taste',

      });

      await new Promise((resolve) => setTimeout(resolve, 500));

    } else {
      this.setState({
        value,
        heading: 'Your AI-Generated Email Will Shine Right Here',
        response1: '',

        name: '',
        businessName: '',
        businessProduct: '',
        businessExperience: '',
        businessNich: '',
        targetAudience: '',
        audiencePain: '',
        audienceNeeds: '',
        USP: '',
        businessFeatures:'',
        businessAdventages:'',

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
    
    const { name, businessName, businessProduct, businessExperience, businessNich, targetAudience, audiencePain, audienceNeeds, USP, businessFeatures, businessAdventages} = this.state;

    if ( !name || !businessName || !businessProduct || !businessExperience || !businessNich || !targetAudience || !audiencePain || !audienceNeeds || !USP || !businessFeatures || !businessAdventages) {
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
        prompt: `Business Description:\n\nOur client is a ${businessName} he's name is ${name} that specializes in ${businessProduct}. With  ${businessExperience}, they have established themselves as a trusted provider in the ${businessNich}.\n\nTarget Audience:\n\nThe target audience comprises ${targetAudience}, who are actively seeking ${audiencePain}. They are looking for ${audienceNeeds} and are interested in finding a reliable and reputable ${businessNich} provider.\n\nUnique Selling Proposition (USP):\n\nOur client's Unique Selling Proposition is ${USP}. They offer ${businessFeatures} that solve their target audience's problems and provide them with ${businessAdventages}.\n\nGoal:\n\nThe goal of this email marketing campaign is to generate quality leads for our client's business. The email should capture the attention of the recipients, create interest in the value our client offers, and prompt them to take action by providing their contact information or requesting more details.\n\nPrompt:\n\nGenerate an engaging email marketing copy that effectively communicates the value and benefits of our client's offerings to the target audience. The email should highlight the unique selling proposition and showcase how our client can solve their pain points or fulfill their needs. Craft a compelling call-to-action that encourages recipients to provide their contact information or engage in further conversation to learn more about our client's products/services.\n\nPlease note that the generated email should be persuasive, customer-focused, and optimized for lead generation. It should clearly communicate the benefits and value proposition of our client's offerings, addressing the target audience's needs and encouraging them to take the desired action of sharing their contact information or expressing interest in learning more.\n\n`,
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
              value={this.state.name}
              label="Your Business Name"
              id="fullWidth"
              name="name"
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
              value={this.state.businessExperience}
              label="Unique Features/Benifites"
              id="fullWidth"
              name="businessExperience"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessNich}
              label="Your Industry/Nich"
              id="fullWidth"
              name="businessNich"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessFeatures}
              label="Your Unique Features"
              id="fullWidth"
              name="businessFeatures"
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
              label="Key Factors That Make You Stand Out"
              multiline
              maxRows={4}
              id="fullWidth"
              name="USP"
              onChange={this.handleChange}
              style={{ marginBottom: '20px' }} 
              required
            />
            <TextField
              fullWidth
              value={this.state.businessAdventages}
              label="Your unique Adventages"
              multiline
              maxRows={4}
              id="fullWidth"
              name="businessAdventages"
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

export default EmailLeads;
