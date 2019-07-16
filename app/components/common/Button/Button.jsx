import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ styles, text }) => (
    <button className={styles.active}>{ text }</button>
);

Button.propTypes = {
  styles: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
