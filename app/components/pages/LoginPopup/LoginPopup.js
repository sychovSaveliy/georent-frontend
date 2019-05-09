import React, { Component } from 'react';
import './style.scss';
import Field from '../../elements/Field';
import Header from '../../containers/Header';


// eslint-disable-next-line react/prefer-stateless-function
class LoginPopup extends Component {
  render() {
    return (
      <div>
        <Header />
        Login Form
        <Field />
        <Field />
      </div>
    );
  }
}

export default LoginPopup;
