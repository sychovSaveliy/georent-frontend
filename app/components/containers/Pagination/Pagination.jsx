import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Pagination = (props) => {
  const { currentPage, getCurrentPage, pagesList, styles } = props;
  const pageNumbers = [...Array(pagesList).keys()].map((x) => x += 1);
  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      className={cs({
        [styles.pagesListItem]: true,
        [styles.currentPage]: number === currentPage
      })}
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
};

export default Pagination;
