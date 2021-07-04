import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ styles }) => (
  <footer className={styles.footer}>
    <span className={styles.copyright}>Copyright &copy;</span>
    <section><h1>Geo<span className={styles.logoIcon}></span>Rent</h1></section>
  </footer>
);

Footer.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Footer;
