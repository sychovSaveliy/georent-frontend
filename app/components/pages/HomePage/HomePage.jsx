import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components/containers/RentMap';
import { Helmet } from 'react-helmet';
import { Paginator } from 'primereact/paginator';
import { baseUrl, getData } from 'utils/api';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
    this.setData(this.getPageUrl(), 'currentPageLots');
    this.setData(`${baseUrl}lot/`, 'lotsAll');
  }

  getPageUrl = () => {
    const { currentPageLots: { pageNumber }, itemsPerPage } = this.state;
    return `${baseUrl}lot/page/${pageNumber}/${itemsPerPage}/current`;
  }

  setData = (url, target) => {
    getData(url).then((data) => {
      this.setState({
        [target]: data
      });
    });
  }

  setCurrentPage = (currentPage) => {
    const { currentPageLots } = this.state;
    currentPageLots.pageNumber = currentPage;
    this.setState({ currentPageLots }, () => this.setData(this.getPageUrl(), 'currentPageLots'));
  }

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
        <div className={styles.content}>
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
          <div>
            <RentMap lots={lotsAll} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
