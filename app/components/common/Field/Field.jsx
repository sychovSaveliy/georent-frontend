import React from 'react';
import PropTypes from 'prop-types';

const Field = ({ styles, id, labelText, type, placeholder, name, value, onChange, error }) => {
  return (
    <div className={styles.form}>
      <div>
        <label htmlFor={id}>{labelText}</label>
      </div>
      <input
        id={id}
        type={type}
        className={styles.form}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error ? <div className={styles.invalid}>{error}</div> : null}
    </div >
  );
};

Field.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Field;
