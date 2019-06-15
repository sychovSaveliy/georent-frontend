import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Header from 'components/containers/Header';
import Footer from 'components/containers/Footer';
import RentMap from 'components//containers/RentMap';

// eslint-disable-next-line react/prefer-stateless-function
const HomePage = ({ styles }) => (
  changePage = (page) => {
    fetch(`api/bla/bla/${page}`).then((v)=> {
      this.setState({ lots: v, currentPage: page })
    })
  }
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
      <LotsList lots={this.state.lots}/>
      <Pagination onClick={this.changePage} currentPage={this.state.currentPage}/>
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
