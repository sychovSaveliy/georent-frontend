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
    return `${baseUrl}search/page/${pageNumber}/${itemsPerPage}/cur/?address=${searchAddress}&lotname=${searchName}`;
  };

  setData = (url, target) => {
    getData(url).then((data) => {
      if (data.lots) {
        data.lots = data.lots.filter(el => el.lotName);
        this.setState({
          [target]: data
        });
      }
      if (data && !data.lots) {
        data = data.filter(el => el.lotName)
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
    this.setState({ searchName: data }, this.setData(this.getPageUrl(), 'currentPageLots'));
  };

  searchAddress = (address) => {
    this.setState({ searchAddress: address }, () => this.setData(this.getPageUrl(), 'currentPageLots'));
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
          <div>
            <div>
              <div>
                <SearchLot searchData={this.searchData} searchAddress={this.searchAddress} />
              </div>
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
          <div>
            <RentMap lots={lotsAll} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
