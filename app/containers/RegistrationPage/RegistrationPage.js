
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class RegistrationPage extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="registration-page">
        <Helmet>
          <title>Registration Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>Sign Up Page</h1>
        <form>
          <label htmlFor="username">
                Please SignUp
            <input
              id="username"
              type="text"
              placeholder="username"
            />
            <input
              id="password"
              type="password"
              placeholder="password"
            />
            <input
              id="submit"
              type="submit"
            />
          </label>
        </form>
      </div>
    );
  }
}
