import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../containers/Header';
import Footer from '../../containers/Footer';
import RentMap from '../../containers/RentMap';
import ProductsSidebar from '../../containers/ProductsSidebar';

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePage extends Component {
  render() {
    return (
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
        <div className="content">
          <ProductsSidebar />
          <RentMap />
        </div>

        <Footer />
      </div>
    );
  }
}
