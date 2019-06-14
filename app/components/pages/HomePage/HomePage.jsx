import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Header from 'components/containers/Header';
import Footer from 'components/containers/Footer';
import RentMap from 'components//containers/RentMap';

// eslint-disable-next-line react/prefer-stateless-function
const HomePage = ({ styles }) => (
  <div>
    <Helmet>
      <title>HomePage</title>
      <meta
        name="description"
        content="Feature page of React.js Boilerplate application"
      />
    </Helmet>
    <Header />
    <h1>GeoRent:</h1>
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
