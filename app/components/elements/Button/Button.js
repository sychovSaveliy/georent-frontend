
import React from 'react';
import style from './style.scss';

const Button = (props) => {
  return (
    <button className={props.active}>{props.text}</button>
  );
};
export default Button;
