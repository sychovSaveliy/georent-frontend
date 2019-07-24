import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {InputText} from 'primereact/inputtext';

const Field = ({ styles, id, labelText, type, placeholder, name, value, onChange, error }) => {
  return (
    <div className={cs(styles.form, 'form-group')}>
      <label htmlFor={id}>{labelText}</label>
      <InputText
        id={id}
        type={type}
        className={cs(styles.form, 'form-control')}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error ? <div className={styles.invalid}>{error}</div> : null}
    </div>
  );
};

Field.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Field;
