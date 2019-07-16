import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Field from 'components/common/Field';
import PropTypes from 'prop-types';

export default class ProfilePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };
  render() {
    const { styles } = this.props;
    return (
      <div className={styles.feature}>
        <Helmet>
          <title>Create Ad Page</title>
          <meta name="description" content="Create Ad Page" />
        </Helmet>
        <h2>Create Ad Page</h2>
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
      </div>
    );
  }
}
