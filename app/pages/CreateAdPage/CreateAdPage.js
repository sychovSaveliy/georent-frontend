import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from 'containers/Header';
// import './style.scss';

export default class CreateAdPage extends Component {
  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Create Ad Page</title>
          <meta
            name="description"
            content="Create Ad Page"
          />
        </Helmet>
          Create Ad Page
      </div>
    );
  }
}
