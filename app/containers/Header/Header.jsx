import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

// <div className="header">
//   <img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png" alt="" />
//   <h4>
//     Best servise to rent or share your stuff in the neighbourhood
//   </h4>
//   <div>
//     <Button text={'Contact info'} />
//     <Button text={'Sign in'} />
//     <Button text={'Share my staff'} active={'active'} />
//   </div>
// </div>

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  render() {
    const {
      styles, isLogged
    } = this.props;
    return (
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            Geo - Rent
          </Link>
          <ul className={styles.navList}>
            <li>
              <Link to="/lots" className={styles.navItem}>
                Lots
              </Link>
              <Link to="/signup" className={styles.navItem}>
                Sign up
              </Link>
              {  !isLogged && 
                <Link to="/login" className={styles.navItem}>
                  Sign in
                </Link>
              }
              {  isLogged && 
                  <button onClick={this.props.onExit}>Exit</button>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
