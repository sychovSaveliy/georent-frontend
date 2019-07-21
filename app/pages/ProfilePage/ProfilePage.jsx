import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { baseUrl, getData} from 'utils/api';

export default class ProfilePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
      }
    };
  };
  componentDidMount = () => {
      let token = window.localStorage.getItem('jwt');
      fetch(`${baseUrl}user`, {
        method: "GET",
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        }
      })
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
      })   
      .then(data => 
        {
          console.log('DATA', data);
          this.setState(prevState => ({
              ...prevState,
              user: {
                  ...prevState.user,
                  id: data.id,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  phoneNumber: data.phoneNumber
              }
          }));
          console.log(this.state)
      });
  }
  render() {
    const { styles, isLogged } = this.props;
    const { id, firstName, lastName, email, phoneNumber } = this.state.user;
    return (
      <div className={styles.feature}>
        <Helmet>
          <title>Profile Page</title>
          <meta
            name="description"
            content="Profile Page"
          />
        </Helmet>
        <h2>Profile</h2>
        <div>
          <Link to="/user/lots">My staff</Link><br />
          <Link to="/create-ad">New staff</Link>
          <h2>{ id } { firstName } {lastName }</h2>
          <div><b>Email</b> <a href={"mailto:" + email} >{ email }</a></div>
          <div><b>Phone</b> <a href={"tel:" + phoneNumber} >{ phoneNumber }</a></div>
          <br/><br/>
          <Link to="/profile/edit">Edit profile</Link>
        </div>
      </div>
    );
  }
}
