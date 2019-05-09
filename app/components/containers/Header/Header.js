import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Field from '../../elements/Field/index';
import './style.scss';
import Button from '../../elements/Button';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/signup">
            Sign Up
          </Link>
          <Link className="router-link" to="/login">
            Login
          </Link>
          <Link className="router-link" to="/profile">
            Profile Page
          </Link>
          <Link className="router-link" to="/create-ad">
            Create Ad
          </Link>
          {/* <Field /> */}
        </div>
      </div>
    );
  }
}

export default Header;
