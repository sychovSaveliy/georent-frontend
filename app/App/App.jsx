import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'containers/Header';
import Footer from 'containers/Footer';
import NotFoundPage from 'pages/NotFoundPage';
import HomePage from 'pages/HomePage';
import FeaturePage from 'pages/FeaturePage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import CreateAdPage from 'pages/CreateAdPage';
import DetailsPage from 'pages/DetailsPage';

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
    if (window.localStorage.getItem("jwt")) {
      this.setState({
        isLogged : true
      });
    }
  };
  login = () => {
      console.log('login', window.localStorage.getItem("jwt"))
      this.setState({
        isLogged : true
      });
  };
  exit = () => {
      this.setState({
        isLogged : false
      });
      window.localStorage.removeItem("jwt");
      console.log('exit', window.localStorage.getItem("jwt"))
  };
  componentDidMount() {
    window.localStorage.removeItem("jwt");
    //this.isLoggedCheck()
  };
/*  componentWillUnmount() {
    window.localStorage.removeItem("jwt");
    this.setState({
      isLogged : true
    });
  };*/
  render() {
    const { styles } = this.props;
    const { isLogged } = this.state;
    return (
      <div className={styles.appWrapper}>
        <Helmet titleTemplate="%s" defaultTitle="Geo Rent">
          <meta name="description" content="Geo Rent" />
        </Helmet>
        <Header isLogged={isLogged}  onExit={this.exit} />
        <Switch>
          <Route exact path="/" component={HomePage} isLogged={isLogged} />
          <Route exact path="/lots" component={HomePage} isLogged={isLogged} />
          <Route exact path="/lots/:lotId" component={DetailsPage} isLogged={isLogged} />
          <Route path="/features" component={FeaturePage} isLogged={isLogged} />
          <Route path="/signup" component={RegistrationPage} isLogged={isLogged} />
          <Route path="/login" component={() => <LoginPage  isLogged={isLogged} onLogin={this.login}/>}/>
          <Route path="/profile" component={ProfilePage} isLogged={isLogged} />
          <Route path="/create-ad" component={CreateAdPage} isLogged={isLogged} />
          <Route path="*" component={NotFoundPage} isLogged={isLogged} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
