import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components/containers/RentMap';
import Pagination from 'components/containers/Pagination';
import { Helmet } from 'react-helmet';
/*import { baseUrl, getData} from 'utils/api.js';*/
const baseURL = 'http://ec2-54-173-110-187.compute-1.amazonaws.com:8080/lot/';
class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 15,
      pagesList: 5,
      currentPageLots: {
        content: []
      },
      lots: [],
    };
  }

  componentDidMount = () => {
    this.getData(this.getPageUrl(), 'currentPageLots');
    this.getData(baseURL, 'lots');
  }

  getPageUrl = () => {
    const { currentPage, itemsPerPage } = this.state
    return `${baseURL}page/${currentPage}/${itemsPerPage}/first`
  }

  getData = (url, target) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
          this.setState({
            [target]: data
          });
      });
  }

  setCurrentPage = (currentPage) => {
    this.setState({ 
      currentPage
    });
    this.getData(this.getPageUrl(), 'currentPageLots');
  }

  render() {
    const { styles } = this.props;
    const {
      currentPageLots,
      currentPage,
      pagesList,
      lots
    } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <LotsList lots={currentPageLots} />
          <div>
           <RentMap lots={lots} />
          </div>
        </div>
        <div>
          <Pagination getCurrentPage={this.setCurrentPage} currentPage={currentPage} pagesList={pagesList} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
