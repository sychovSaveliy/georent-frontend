import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

class Header extends Component {
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
          <Link to="/" className={styles.logo}>Geo - Rent</Link>
          <ul className={styles.navList}>
            <li>
              <Link to="/lots" className={styles.navItem}>Lots</Link>
              {  !isLogged &&
                <>
                  <Link to="/signup" className={styles.navItem}>Sign up</Link>
                  <Link to="/login" className={styles.navItem}>Sign in</Link>
                </>
              }
              {  isLogged &&
                  <>
                    <Link to="/profile" className={styles.navItem}>Profile</Link>
                    <Link to="/"><Button label='Exit' onClick={this.props.onExit}></Button></Link>
                  </>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
