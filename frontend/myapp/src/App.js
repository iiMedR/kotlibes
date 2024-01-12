import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PricingPage from './Pages/PricingPage';
import Checkout from './Pages/Checkout';
import Upgrade from './Pages/Upgrade';
import HomePage from './Pages/HomePage';
import Tools from '../src/Pages/Tools';
//import MarketingStrategy from './Pages/tool-pages/marketingStrategy';
import Login from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import EmailsWritingLG from './Pages/tool-pages/EmailsWritingLG';
import EmailsWritingIS from './Pages/tool-pages/EmailsWritingIS';
import InstagramPostScript from './Pages/tool-pages/InstagramPostScript';
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Tools/email-leads-generation" element={<EmailsWritingLG />} />
            <Route path="/Tools/email-increasing-sales" element={<EmailsWritingIS />} />
            <Route path="/Tools/instagram-post-Scripts" element={<InstagramPostScript />} />
            <Route path="/Tools/linkedin-content-ideas" element={<LinkedinContentM />} />
            <Route path="/Tools/tiktok-content-ideas" element={<TiktokContentM />} />
            <Route path="/Tools/instagram-content-ideas" element={<InstagramContentM />} />
            <Route path="/Tools/buyer-persona" element={<BuyerPersona />} />
            <Route path="/Tools/usp-generator" element={<BusinessUSP />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/Pricing" element={<PricingPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Tools" element={<Tools />} />
            {/*<Route path="/Tools/marketing-strategy" element={<MarketingStrategy />} />*/}
          </Routes>
        </Router>
    );
  }
}

export default App;
