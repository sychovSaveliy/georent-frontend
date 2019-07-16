import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default class FeaturePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };
  render() {
    const { styles } = this.props;
    return (
      <div className={styles.feature-page}>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature Page"
          />
        </Helmet>
        <h2>Feature Page</h2>
      </div>
    );
  }
}
