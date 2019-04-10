
import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import FeaturePage from '../FeaturePage/Loadable';
import Footer from '../../components/Footer';
import RegistrationPage from '../RegistrationPage/Loadable';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="Geo Rent"
    >
      <meta name="description" content="Geo Rent" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      {/* <Route path="" component={NotFoundPage} /> */}
      <Route path="/signup" component={RegistrationPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
