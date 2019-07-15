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
      this.setState({
        isLogged : true
      });
  };
  exit = () => {
      window.localStorage.removeItem("jwt")
      this.setState({
        isLogged : false
      });
  };
  componentDidMount() {
    this.isLoggedCheck()
  };
/*  componentWillUnmount() {
    window.localStorage.removeItem("jwt");
    this.setState({
      isLogged : false
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
        <Header isLogged={isLogged} onExit={this.exit} />
        <Switch>
          <Route exact path="/" render={props => {return <HomePage {...props} isLogged={isLogged} />}} />
          <Route exact path="/lots" render={props => {return <HomePage {...props} isLogged={isLogged} />}} />
          <Route exact path="/lots/:lotId" render={props => {return <DetailsPage {...props} isLogged={isLogged} />}} />
          <Route path="/features" render={props => {return <FeaturePage {...props} isLogged={isLogged} />}} />
          <Route path="/signup" render={props => {return <RegistrationPage {...props} isLogged={isLogged} />}} />
          <Route render={props => {return <LoginPage {...props} isLogged={isLogged} onLogin={this.login} />}} />
          <Route path="/profile" render={props => {
              if (!isLogged) {
                  return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              }
              return <ProfilePage {...props} isLogged={isLogged} />
          }} />
          <Route path="/create-ad" render={props => {
              if (!isLogged) {
                  return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              }
              return <CreateAdPage {...props} isLogged={isLogged} />
          }} />
          <Route path="*" render={props => {return <NotFoundPage {...props} isLogged={isLogged} />}} />
        </Switch>
        <Footer isLogged={isLogged} />
      </div>
    );
  }
}
