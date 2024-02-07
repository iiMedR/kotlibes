import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/HomePage';
import Login from './Pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Tools from '../src/Pages/Tools';
//import MarketingStrategy from './Pages/tool-pages/marketingStrategy';
import BuyerPersona from './Pages/tool-pages/BuyerPersona';
import BusinessUSP from './Pages/tool-pages/BusinessUSP';
import InstagramContentM from './Pages/tool-pages/InstagramContentM';
import TiktokContentM from './Pages/tool-pages/TiktokContentM';
import LinkedinContentM from './Pages/tool-pages/LinkedinContentM';
import InstagramPostS from './Pages/tool-pages/InstagramPostScript';
import EmailsWritingIS from './Pages/tool-pages/EmailsWritingIS';
import EmailsWritingLG from './Pages/tool-pages/EmailsWritingLG';
import Settings from './Pages/Settings';
//ida mab9atch khdama ankhrej resetpassword o changepassword mn dik folder o nredo n blasto
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import NotFound from './components/NotFound';
import PricingPage from './Pages/PricingPage';
import Test from './Pages/Test'
import Checkout from './Pages/Checkout';
import Upgrade from './Pages/Upgrade';



class App extends Component  {
  render(){
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />}  />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard"  element={<Dashboard />}  />
            <Route path="/Tools" element={<Tools />}  />
            {/*<Route path="/Tools/marketing-strategy" element={<MarketingStrategy />}  />*/}
            <Route path="/Tools/buyer-persona" element={<BuyerPersona />}  />
            <Route path="/Tools/usp-generator" element={<BusinessUSP />}  />
            <Route path="/Tools/instagram-content-ideas" element={<InstagramContentM />}  />
            <Route path="/Tools/tiktok-content-ideas" element={<TiktokContentM />}  />
            <Route path="/Tools/linkedin-content-ideas" element={<LinkedinContentM />}  />
            <Route path="/Tools/instagram-post-Scripts" element={<InstagramPostS />}  />
            <Route path="/Tools/email-increasing-sales" element={<EmailsWritingIS />}  />
            <Route path="/Tools/email-leads-generation" element={<EmailsWritingLG />}  />
            <Route path='/settings' element={<Settings />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/Pricing' element={<PricingPage />} />
            <Route path='/Test' element={<Test />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/upgrade' element={<Upgrade />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Router>
    );
  }

}

export default App;
