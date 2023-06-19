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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { loading, heading, userStatus } = this.state;
    const isAllowedToGenerate = userStatus === 'trial';
    return (
      <div>
        <NavbarTool />
        <div className="inputOutput">
          <form className="inputs-tool">
            <h4>ABOUT YOUR BUSINESS</h4>
            <TextField
              fullWidth
              value={this.state.businessName}
              label="Type here"
              id="fullWidth"
              name="businessName"
              onChange={this.handleChange}
              required
            />
            <TextField
              fullWidth
              value={this.state.targetAudience}
              label="Type here"
              id="fullWidth"
              name="targetAudience"
              onChange={this.handleChange}
              required
            />
          </form>
          <div className="output-tool">
          </div>
        </div>
      </div>
    );
  }
}

export default Instagram;
