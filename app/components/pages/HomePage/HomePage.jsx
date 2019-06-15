import React from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components//containers/RentMap';

const HomePage = ({ styles }) => (
  <div>
    <div className={styles.content}>
      <LotsList />
      <div>
        <RentMap />
      </div>
    </div>
    <Footer />
  </div>
);

HomePage.propTypes = {
  styles: PropTypes.object.isRequired
};

export default HomePage;
