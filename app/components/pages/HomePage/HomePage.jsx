import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components//containers/RentMap';
import Pagination from 'components/containers/Pagination';
import { Helmet } from 'react-helmet';

class HomePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      itemsPerPage: 15,
      pagesList: 5
    };
  }

  componentDidMount = () => {
    const { currentPage } = this.state;
    this.getLots(currentPage);
  }

  setCurrentPage = (currentPage) => {
    console.log(this.state)
    this.setState({ currentPage });
    this.getLots(currentPage);
  }

  getLots = (numberPage) => {
    const { itemsPerPage } = this.state
    fetch(`http://ec2-54-173-110-187.compute-1.amazonaws.com:8080/lot/page/${numberPage}/${itemsPerPage}/first`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          items: res.content
        });
      });
  }

  render() {
    const { styles } = this.props;
    const {
      items,
      currentPage,
      pagesList
    } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <LotsList itemsList={items} />
          <div>
            <RentMap />
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
