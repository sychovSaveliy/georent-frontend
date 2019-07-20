import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ styles, id, labelText, type, placeholder, name, value, onChange, error }) => {
  return (
    <div className={styles.form}>
      <label htmlFor={id}>{labelText}</label>

      {error ? <div className={styles.invalid}>{error}</div> : null}
    </div>
  );
};

Textarea.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Textarea;
