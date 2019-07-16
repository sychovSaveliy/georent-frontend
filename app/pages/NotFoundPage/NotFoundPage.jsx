import React from 'react';
import PropTypes from 'prop-types';

const NotFoundPage = ({ styles }) => (
    <article>
      <h1>Page not found.</h1>
    </article>
);

NotFoundPage.propTypes = {
  styles: PropTypes.object.isRequired
};

export default NotFoundPage;