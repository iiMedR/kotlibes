import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class App extends Component {
  render(){
    return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
    );
  }
}

export default App;
