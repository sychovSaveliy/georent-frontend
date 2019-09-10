import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import LotsList from 'components/LotsList';
import RentMap from 'components/RentMap';
import { Helmet } from 'react-helmet';
import { baseUrl, getData } from 'utils/api';
import SearchLot from 'components/SearchLot';
import { Paginator } from 'primereact/paginator';

class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    setAllLots: () => PropTypes.func,
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
    andOr: false,
    myRef: React.createRef()
  };

  componentDidMount = () => {
    console.log('jwt', window.localStorage.getItem('jwt'));
    this.setData(this.getPageUrl(), 'currentPageLots');
    this.setData(`${baseUrl}lot/`, 'lotsAll');
    this.toFixMap();
  };

  toFixMap = () => {
    const myRef = this.state.myRef.current;
    window.addEventListener('scroll', () => {
      let scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled >= 67) {
        myRef.classList.add('fixedMap');
      } else {
        myRef.classList.remove('fixedMap');
      }
    });
  };

  getPageUrl = () => {
    const {
      currentPageLots: { pageNumber },
      itemsPerPage,
      searchAddress,
      searchName,
      andOr
    } = this.state;
    return `${baseUrl}search/page/andor/${pageNumber}/${itemsPerPage}/cur/?address=${searchAddress}&lotname=${searchName}&andor=${andOr}`;
  };

  setData = (url, target) => {
    getData(url).then((data) => {
      if (target === 'lotsAll') {
        this.props.setAllLots(data);
      }
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

  setSearchFlag = (value) => {
    this.setState({andOr: value});
  };

  searchData = (name, address) => {
    this.setState({searchName: name, searchAddress: address}, () => this.setData(this.getPageUrl(), 'currentPageLots'));
  };

  searchAddress = (address) => {
    this.setState({searchAddress: address}, () => this.setData(this.getPageUrl(), 'currentPageLots'));
  };

  render() {
    const { styles } = this.props;
    const {
      currentPageLots: { totalPages, lots },
      lotsAll,
      first,
      itemsPerPage,
      andOr
    } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.homePageLeft}>
            <div>
              <SearchLot
                searchData={this.searchData}
                searchAddress={this.searchAddress}
                setFlag={this.setSearchFlag}
                andOr={andOr}
              />
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
            <div ref={this.state.myRef} id="rentMap">
              <RentMap lots={lotsAll} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect()(HomePage);
