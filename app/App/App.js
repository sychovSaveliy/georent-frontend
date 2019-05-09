
import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from '../components/pages/NotFoundPage';
import Header from '../components/containers/Header';
import HomePage from '../components/pages/HomePage/index';
import FeaturePage from '../components/pages/FeaturePage';
import Footer from '../components/containers/Footer';
import RegistrationPage from '../components/pages/RegistrationPage';
import './style.scss';
import LoginPopup from '../components/pages/LoginPopup';
import ProfilePage from '../components/pages/ProfilePage';
import CreateAdPage from '../components/pages/CreateAdPage';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="Geo Rent"
    >
      <meta name="description" content="Geo Rent" />
    </Helmet>

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      <Route path="/signup" component={RegistrationPage} />
      <Route path="/login" component={LoginPopup} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/create-ad" component={CreateAdPage} />
    </Switch>

  </div>
);

export default App;
