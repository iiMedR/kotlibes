import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/LoginPage';
import LinkedinContentM from './Pages/tool-pages/LinkedinContentM';
import TiktokContentM from './Pages/tool-pages/TiktokContentM';
import InstagramContentM from './Pages/tool-pages/InstagramContentM';
import BuyerPersona from './Pages/tool-pages/BuyerPersona';
import BusinessUSP from './Pages/tool-pages/BusinessUSP';
import Settings from './Pages/Settings';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class App extends Component {
  render(){
    return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/Tools/linkedin-content-ideas" element={<LinkedinContentM />} />
            <Route path="/Tools/tiktok-content-ideas" element={<TiktokContentM />} />
            <Route path="/Tools/instagram-content-ideas" element={<InstagramContentM />} />
            <Route path="/Tools/buyer-persona" element={<BuyerPersona />} />
            <Route path="/Tools/usp-generator" element={<BusinessUSP />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </Router>
    );
  }
}

export default App;
