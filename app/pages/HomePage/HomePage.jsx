import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/LotsList';
import RentMap from 'components/RentMap';
import { Helmet } from 'react-helmet';
import { baseUrl, getData } from 'utils/api';
import SearchLot from 'components/SearchLot';
import { Paginator } from 'primereact/paginator';

class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };

  state = {
    first: 0,
    itemsPerPage: 3,
    searchAddress: '',
    searchName: '',
    currentPageLots: {
      pageNumber: 1,
      lots: [],
      totalPages: 0
    },
    lotsAll: [],
  };

  componentDidMount = () => {
    console.log('jwt', window.localStorage.getItem('jwt'));
    this.setData(this.getPageUrl(), 'currentPageLots');
    this.setData(`${baseUrl}lot/`, 'lotsAll');
  };

  getPageUrl = () => {
    const {
      currentPageLots: { pageNumber },
      itemsPerPage,
      searchAddress,
      searchName
    } = this.state;
    return `${baseUrl}lot/page/${pageNumber}/${itemsPerPage}/cur`;
  };

  setData = (url, target) => {
    getData(url).then((data) => {
      console.log('DATA', data)
      if (data.lots) {
        this.setState({
          [target]: data
        });
      }
      if (data) {
        this.setState({
          [target]: data
        });
      }
    });
  };

  setCurrentPage = (currentPage) => {
    const { currentPageLots } = this.state;
    currentPageLots.pageNumber = currentPage;
    this.setState({ currentPageLots }, () => this.setData(this.getPageUrl(), 'currentPageLots'));
  };

  searchData = (data) => {
    const {
      currentPageLots: { pageNumber },
      itemsPerPage
    } = this.state;
    const url = `${baseUrl}search/page/${pageNumber}/${itemsPerPage}/cur/?address=&lotname=${data}`;
    this.setData(url, 'currentPageLots');
  };

  searchAddress = (address) => {
    const {
      currentPageLots: { pageNumber },
      itemsPerPage
    } = this.state;
    const url = `${baseUrl}search/page/${pageNumber}/${itemsPerPage}/cur/?address=${address}&lotname=`;
    this.setData(url, 'currentPageLots');
  };

  render() {
    const { styles } = this.props;
    const {
      currentPageLots: { totalPages, lots },
      lotsAll,
      first,
      itemsPerPage,
    } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.homePageLeft}>
            <div>
              <SearchLot searchData={this.searchData} searchAddress={this.searchAddress} />
              <LotsList lots={lots} />
              <Paginator
                className={styles.paginator}
                first={first}
                rows={itemsPerPage}
                totalRecords={totalPages * itemsPerPage}
                rowsPerPageOptions={[3, 5, 7]}
                onPageChange={(e) => {
                  this.setCurrentPage(e.page + 1);
                  this.setState({ first: e.first, itemsPerPage: e.rows });
                }}
              >
              </Paginator>
            </div>
          </div>
          <div className={styles.homePageRight}>
            <RentMap lots={lotsAll} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
