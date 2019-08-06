import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {InputTextarea} from 'primereact/inputtextarea';
const Textarea = ({ styles, id, labelText, type, placeholder, name, value, onChange, error }) => {
  return (
    <div className={styles.form}>
      <label htmlFor={id}>{labelText}</label>
		<InputTextarea
          rows={5}
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

Textarea.propTypes = {
  styles: PropTypes.object.isRequired
};

export default Textarea;
