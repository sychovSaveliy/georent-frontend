
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../containers/Header';
import Input from '../../elements/Input';
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
        <Input />
        <Input />
        <Input />
        <h2>Contact Information</h2>
        <Input />
        <Input />
        <Input />
        <h2>Change Password</h2>
        <Input />
        <Input />
        <Input />
          This is Profile Page
      </div>
    );
  }
}
