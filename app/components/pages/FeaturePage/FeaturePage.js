
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class FeaturePage extends Component {
  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
          This is Feature Page
      </div>
    );
  }
}
