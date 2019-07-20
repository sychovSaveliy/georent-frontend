import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/LotsList';
import RentMap from 'components/RentMap';
import { Helmet } from 'react-helmet';
import { baseUrl, getData } from 'utils/api';
import SearchLot from 'components/SearchLot';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Paginator } from 'primereact/paginator';
class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }

    state = {
      first: 0,
      itemsPerPage: 3,
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
  }

  getPageUrl = () => {
    const { currentPageLots: { pageNumber }, itemsPerPage } = this.state;
    return `${baseUrl}lot/page/${pageNumber}/${itemsPerPage}/current`;
  }

  setData = (url, target) => {
    getData(url).then((data) => {
      if (data) {
        this.setState({
          [target]: data
        });        
      } else {
        this.setState({
          [target]: null
        });     
      }

    });
  }

  setCurrentPage = (currentPage) => {
    const { currentPageLots } = this.state;
    currentPageLots.pageNumber = currentPage;
    this.setState({ currentPageLots }, () => this.setData(this.getPageUrl(), 'currentPageLots'));
  }

  searchData = (data) => {
    const url = `${baseUrl}search/filters/?address=&lotname=${data}`;
    this.setData(url, 'currentPageLots');
  };

  searchAddress = (address) => {
    const url = `${baseUrl}search/filters/?address=${address}&lotname=`;
    this.setData(url, 'currentPageLots');
  };

  render() {
    const { styles } = this.props;
    const {
      currentPageLots: { totalPages, lots },
      lotsAll,
      first,
      itemsPerPage
    } = this.state;
    return (
      <div>
        <div>
          <SearchLot searchData={this.searchData} searchAddress={this.searchAddress} />
        </div>
        <div className={styles.content}>
          <div>
            {lots && 
              <div>
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
            }}
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
