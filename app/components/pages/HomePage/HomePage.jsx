import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components/containers/RentMap';
import Pagination from 'components/containers/Pagination';
import { Helmet } from 'react-helmet';
import { baseUrl, getData} from 'utils/api';
class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }
  state = {
    currentPage: 1,
    itemsPerPage: 15,
    currentPageLots: {
      lots: [],
      totalPages: 0
    },
    lots: [],
  };

  componentDidMount = () => {
    this.setData(this.getPageUrl(), 'currentPageLots');
    this.setData(baseUrl + 'lot/', 'lots');
  }

  getPageUrl = () => {
    const { currentPage, itemsPerPage } = this.state
    return `${baseUrl}lot/page/${currentPage}/${itemsPerPage}/first`
  }

  setData = (url, target) => {
    getData(url).then(data => {
          this.setState({
            [target]: data
          });
      });
  }

  setCurrentPage = (currentPage) => {
    this.setState({ 
      currentPage
    });
    setData(this.getPageUrl(), 'currentPageLots');
  }

  render() {
    const { styles } = this.props;
    const {
      currentPageLots,
      currentPage,
      lots
    } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <LotsList lots={currentPageLots.lots} />
          <div>
           <RentMap lots={lots} />
          </div>
        </div>
        <div>
          <Pagination getCurrentPage={this.setCurrentPage} currentPage={currentPage} pagesList={currentPageLots.totalPages} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
