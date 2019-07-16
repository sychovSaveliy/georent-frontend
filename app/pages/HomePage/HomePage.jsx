import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/LotsList';
import RentMap from 'components/RentMap';
import Pagination from 'components/Pagination';
import { Helmet } from 'react-helmet';
import { baseUrl, getData} from 'utils/api';
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
    console.log('jwt', window.localStorage.getItem("jwt"));
    this.setData(this.getPageUrl(), 'currentPageLots');
    this.setData(baseUrl + 'lot/', 'lotsAll');
  }

  getPageUrl = () => {
    const { currentPageLots: { pageNumber }, itemsPerPage } = this.state;
    return `${baseUrl}lot/page/${pageNumber}/${itemsPerPage}/current`;
  }

  setData = (url, target) => {
    getData(url).then(data => {
          console.log('DATA',data);
          this.setState({
            [target]: data
          });
      });
  }

  setCurrentPage = (currentPage) => {
    const { currentPageLots } = this.state;
    currentPageLots.pageNumber = currentPage;
    this.setState({ currentPageLots });
    this.setData(this.getPageUrl(), 'currentPageLots');
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
      </div>
    );
  }
}

export default HomePage;
