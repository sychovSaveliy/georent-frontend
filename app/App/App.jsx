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
import UserLotsPage from 'pages/UserLotsPage';
import ForgotPassPage from 'pages/ForgotPassPage';

import queryString from 'query-string'

export default class App extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      isLogged: window.localStorage.getItem("jwt") ? 1 : 0,
      // values: queryString.parse(this.props.location.search),
    };
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
  render() {
    const { styles } = this.props;
    const { isLogged } = this.state; 
    const valuesHref = queryString.parse(window.location.href); 
    // const pathForgot = valuesHref.path;
    const pathForgot = valuesHref.path + "";
    const tokenType = valuesHref.tokentype + "";
    const accessToken = valuesHref.accesstoken;
    debugger
    // localhost:3000/?main=""&path=forgot&tokentype=Bearer&accesstoken=12345
    // var anchor = document.getElementById("App");
    // var result = anchor.href;
    // const {path} = values.path;
    return (
      <div className={styles.appWrapper}>
        <Helmet titleTemplate="%s" defaultTitle="Geo Rent">
          <meta name="description" content="Geo Rent" />
        </Helmet>
        <Header isLogged={isLogged} onExit={this.exit} />
        <Switch>
          <Route exact path="/" render={props => {return <HomePage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route exact path="/lots" render={props => {return <HomePage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route exact path="/user/lot/:lotId" render={props => {return <DetailsPage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route path="/features" render={props => {return <FeaturePage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route path="/signup" render={props => {return <RegistrationPage {...props} isLogged={isLogged} />}} />
          <Route path="/forgot" render={props => {return <ForgotPassPage {...props} isLogged="false" onExit={this.exit} />}} />
          {/* <Route path="/forgot" render={props => {
              if (pathForgot === "forgot" && tokenType === "Bearer" && !accessToken ) {
                return <Redirect to={{ pathname: '/forgot?tokenType=Bearer&accessToken=${accessToken}', state: { from: props.location } }} />
              }
              else {
                return <ForgotPassPage {...props} isLogged="false" onExit={this.exit} />
              }
          }} /> */}

          <Route path="/login" render={props => {return <LoginPage {...props} isLogged={isLogged} onLogin={this.login} />}} />
          <Route path="/profile" render={props => {
              if (!window.localStorage.getItem("jwt")) {
                  return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              } else return <ProfilePage {...props} isLogged={isLogged} onExit={this.exit} />
          }} />
          <Route path="/create-ad" render={props => {
              if (!window.localStorage.getItem("jwt")) {
                  return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              } else return <CreateAdPage {...props} isLogged={isLogged} onExit={this.exit} />
          }} />
          <Route path="/user/lots" render={props => {
              return <UserLotsPage {...props} isLogged={isLogged} onExit={this.exit} />
          }} />
          <Route path="*" render={props => {return <NotFoundPage {...props} isLogged={isLogged} />}} />
        </Switch>
        <Footer isLogged={isLogged} />
      </div>
    );
  }
}
