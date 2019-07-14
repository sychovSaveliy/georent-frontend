import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotFoundPage from '../components/pages/NotFoundPage';
import Header from 'components/containers/Header';
import Footer from 'components/containers/Footer';
import HomePage from 'components/pages/HomePage/index';
import FeaturePage from 'components/pages/FeaturePage';
import RegistrationPage from 'components/pages/RegistrationPage';
import LoginPopup from 'components/pages/LoginPopup';
import ProfilePage from 'components/pages/ProfilePage';
import CreateAdPage from 'components/pages/CreateAdPage';
import DetailsPage from 'components/pages/DetailsPage';

export default class App extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      isLogged: false,
    };
  };
  isLoggedCheck = () => {
    const { isLogged } = this.state;
    if (window.localStorage.getItem("jwt")) {
      this.setState({
        isLogged : true
      });
    }
  };
  componentDidMount() {
    this.isLoggedCheck()
  };
  componentWillUnmount() {
    window.localStorage.removeItem("jwt");
  };
  render() {
    const { styles } = this.props;
    const { isLogged } = this.state;
    return (
      <div className={styles.appWrapper}>
        <Helmet titleTemplate="%s" defaultTitle="Geo Rent">
          <meta name="description" content="Geo Rent" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} isLogged={isLogged} />
          <Route exact path="/lots" component={HomePage} isLogged={isLogged} />
          <Route exact path="/lots/:lotId" component={DetailsPage} isLogged={isLogged} />
          <Route path="/features" component={FeaturePage} isLogged={isLogged} />
          <Route path="/signup" component={RegistrationPage} isLogged={isLogged} />
          <Route path="/login" component={LoginPopup} isLogged={isLogged} />
          <Route path="/profile" component={ProfilePage} isLogged={isLogged} />
          <Route path="/create-ad" component={CreateAdPage} isLogged={isLogged} />
          <Route path="*" component={NotFoundPage} isLogged={isLogged} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
