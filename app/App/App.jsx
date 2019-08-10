import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PrivateRoute from 'components/PrivateRoute';
import Header from 'containers/Header';
import Footer from 'containers/Footer';
import NotFoundPage from 'pages/NotFoundPage';
import HomePage from 'pages/HomePage';
import FeaturePage from 'pages/FeaturePage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import ProfilePageEdit from 'pages/ProfilePageEdit';
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
    };
  };
  login = () => {
      this.setState({
        isLogged : true
      });
  };
  exit = () => {
      window.localStorage.removeItem("jwt");
      this.setState({
        isLogged : false
      });
      window.location.assign('/');
      // window.location.assign(window.location.origin);
  };
  render() {
    const { styles } = this.props;
    const { isLogged } = this.state;
    const valuesHref = queryString.parse(window.location.href);
    const path = valuesHref.path + "";
    const tokenType = valuesHref.tokentype + "";
    const accessToken = valuesHref.accesstoken;
    return (
      <div className={styles.appWrapper}>
        <Helmet titleTemplate="%s" defaultTitle="Geo Rent">
          <meta name="description" content="Geo Rent" />
        </Helmet>
        <Header isLogged={isLogged} onExit={this.exit} />
        <Switch>
        <Route exact path="/" render={props => {
            debugger
            if ((path === "forgot") && (tokenType === "Bearer") && accessToken){
              return <ForgotPassPage {...props} isLogged={isLogged} />
            }  
            else if (path === "profile") {
              return <ProfilePage {...props} isLogged={isLogged} />
            } 
            else { 
              return <HomePage {...props} isLogged={isLogged} onExit={this.exit} />
            }
          
          }} />
          <Route exact path="/lots" render={props => {return <HomePage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route exact path="/user/lot/:lotId" render={props => {return <DetailsPage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route path="/features" render={props => {return <FeaturePage {...props} isLogged={isLogged} onExit={this.exit} />}} />
          <Route path="/signup" render={props => {return <RegistrationPage {...props} isLogged={isLogged} />}} />
          {/* <Route path="/forgot" render={props => {return <ForgotPassPage {...props} isLogged={isLogged} />}} /> */}
          <Route path="/login" render={props => {return <LoginPage {...props} isLogged={isLogged} onLogin={this.login} />}} />
          <PrivateRoute exact path="/profile" component={ProfilePage} isLogged={isLogged} onExit={this.exit} />
          <PrivateRoute path="/profile/edit" component={ProfilePageEdit} isLogged={isLogged} onExit={this.exit} />
          <Route  path="/prof-edit-reset" render={props => {return <ProfilePageEdit {...props} isLogged={isLogged}  onExit={this.exit}/>}} />
          <Route path="/create-ad" render={props => {
              {/*if (!window.localStorage.getItem("jwt")) {
                  return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              } else */}
              return <CreateAdPage {...props} isLogged={isLogged} onExit={this.exit} />
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
