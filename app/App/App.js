
import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

// import NotFoundPage from '../components/pages/NotFoundPage';
import Header from 'components/containers/Header';
import HomePage from 'components/pages/HomePage/index';
// import FeaturePage from 'components/pages/FeaturePage';
import RegistrationPage from 'components/pages/RegistrationPage';
// import './style.scss';
// import LoginPopup from 'components/pages/LoginPopup';
import ProfilePage from 'components/pages/ProfilePage';
import CreateAdPage from 'components/pages/CreateAdPage';
import DetailsPage from 'components/pages/DetailsPage';

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
      <Route exact path="/lots" component={HomePage} />
      <Route exact path="/lots/:lotId" component={DetailsPage} />
      {/* <Route path="/features" component={FeaturePage} /> */}
      <Route path="/signup" component={RegistrationPage} />
      {/* <Route path="/login" component={LoginPopup} /> */}
      <Route path="/profile" component={ProfilePage} />
      <Route path="/create-ad" component={CreateAdPage} />
      <Redirect to="/lots" />
    </Switch>
  </div>
);

export default App;
