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

class Linkedin extends Component {
  render() {
    return (
      <div>
        <div className="inputOutput">
          <form className="inputs-tool">
          </form>
          <div className="output-tool">
          </div>
        </div>
      </div>
    );
  }
}

export default Linkedin;
