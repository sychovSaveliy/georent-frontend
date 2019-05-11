import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button/index';
import './style.scss';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        <h4>
          Best servise to rent or share your stuff in the neighbourhood
        </h4>
        <div>
          <Button text={'Contact info'}/>
          <Button text={'Sign in'}/>
          <Button text={'Share my staff'} active={'active'}/>
        </div>
      </div>
    );
  }
}

export default Header;
