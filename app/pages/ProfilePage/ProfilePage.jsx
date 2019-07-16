import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Field from 'components/common/Field';
import { Link } from 'react-router-dom';
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
          <title>Profile Page</title>
          <meta
            name="description"
            content="Profile Page"
          />
        </Helmet>
        <h2>General Information</h2>
        <Link to="/user/lots">My staff</Link>
        <br />
        <Link to="/create-ad">New staff</Link>
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
