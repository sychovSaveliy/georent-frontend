import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Field from 'components/common/Field';
// import './style.scss';

export default class ProfilePage extends Component {
  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Profile Page</title>
          <meta
            name="description"
            content="Profile Page"
          />
        </Helmet>
        <h2>General Information</h2>
        <Field />
        <Field />
        <Field />
        <h2>Contact Information</h2>
        <Field />
        <Field />
        <Field />
        <h2>Change Password</h2>
        <Field />
        <Field />
        <Field />
          This is Profile Page
      </div>
    );
  }
}
