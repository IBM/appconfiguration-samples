import React, { useState } from 'react';
import './app.scss';
import { Route, Routes } from 'react-router-dom';
import { Theme } from '@carbon/react';
import { TopHeader, SideHeader } from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import FlightPage from './components/Flightpage';
import { useFeature } from 'ibm-appconfiguration-react-client-sdk';

const App = () => {

  const [email, setEmail] = useState('');
  const handleChange = (val) => {
    setEmail(val);
  }
  const leftNavFeatureFlag = useFeature('left-navigation-menu');
  const isleftNavEnabled = leftNavFeatureFlag.getCurrentValue(email || 'defaultUser');

  return (
    <>
      <Theme theme="g100">
        {isleftNavEnabled ?
          <><SideHeader email={email} onChange={handleChange} /></>
          : <><TopHeader email={email} onChange={handleChange} /></>}
      </Theme>

      <Routes>
        <Route path="/" element={<HomePage email={email}/>} />
        <Route path="/flightbooking" element={<FlightPage email={email}/>} />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
