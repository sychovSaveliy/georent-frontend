import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ styles }) => (
  <footer className={styles.footer}>
    <section>Copyright </section>
    <section>GeoRent</section>
  </footer>
);

Footer.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Footer;
