import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components/containers/RentMap';
import Pagination from 'components/containers/Pagination';
/* import { baseUrl, getData} from 'utils/api.js'; */
const baseURL = 'http://ec2-52-206-69-68.compute-1.amazonaws.com:8080/lot/';
class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  state = {
    itemsPerPage: 3,
    currentPageLots: {
      pageNumber: 1,
      lots: [],
      totalPages: 0
    },
    lotsAll: [],
  };

  componentDidMount = () => {
    this.getData(this.getPageUrl(), 'currentPageLots');
    this.getData(baseURL, 'lotsAll');
  }

  getPageUrl = () => {
    const { currentPageLots: { pageNumber }, itemsPerPage } = this.state;
    return `${baseURL}page/${pageNumber}/${itemsPerPage}/current`;
  }

  getData = (url, target) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          [target]: data
        });
      });
  }

  setCurrentPage = (currentPage) => {
    const { currentPageLots } = this.state;
    currentPageLots.pageNumber = currentPage;
    this.setState({ currentPageLots });
    this.getData(this.getPageUrl(), 'currentPageLots');
  }

  render() {
    const { styles } = this.props;
    const {
      currentPageLots: { pageNumber, totalPages, lots },
      lotsAll
    } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <LotsList lots={lots} />
          <div>
            <RentMap lots={lotsAll} />
          </div>
        </div>
        <div>
          <Pagination getCurrentPage={this.setCurrentPage} currentPage={pageNumber} pagesList={totalPages} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
