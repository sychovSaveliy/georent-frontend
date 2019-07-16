import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Check = ({ styles }) => {
  const {
    id,
    labelText,
    type,
    name,
    value,
    checked,
    defaultChecked,
    onCheck,
    error
  } = props;
  return (
    <div className={styles.form-group}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        className={styles.form-control}
        name={name}
        value={value}
        checked={checked}
        onClick={onCheck}
      />
      {error ? <div className={styles.invalid-feedback} className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

Check.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Check;
