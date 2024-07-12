import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';
import { withAppConfigProvider } from 'ibm-appconfiguration-react-client-sdk';

(async () => {
  const AppConfiguration = await withAppConfigProvider({
    region: process.env.REACT_APP_REGION,
    guid: process.env.REACT_APP_GUID,
    apikey: process.env.REACT_APP_APIKEY,
    collectionId: process.env.REACT_APP_COLLECTION_ID,
    environmentId: process.env.REACT_APP_ENVIRONMENT_ID
  })

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <AppConfiguration>
      <Router>
        <App />
      </Router>
    </AppConfiguration>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
