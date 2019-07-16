import React, { Component } from 'react';
import Field from 'components/common/Field';
import { baseUrl } from 'utils/api';
import PropTypes from 'prop-types';

class ForgotPassPage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };
  constructor() {
    super();

    this.state = {
    };
  };
  render() {
    const { styles } = this.props;
    return (
      <div>
        <h2>ForgotPass Form</h2>
        <div className={styles.form}>
        <Field />
        </div>
      </div>
    );
  }
}

export default ForgotPassPage;
