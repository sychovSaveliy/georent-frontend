import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { styles } = this.props;
    const { getCurrentPage, currentPage, pagesList } = this.props;
    const pageNumbers = [...Array(pagesList).keys()].map((x) => x += 1);
    const renderPageNumbers = pageNumbers.map((number) => (
      <li
        className={number === currentPage ? `${styles.currentPage} ${styles.pagesListItem}` : styles.pagesListItem}
        key={number}
        id={number}
        onClick={() => getCurrentPage(number)}
      >
        {number}
      </li>
    ));

    return (
      <div>
        <ul id="page-numbers" className={styles.pagesList}>
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

export default Pagination;
