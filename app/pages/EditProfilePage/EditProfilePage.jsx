import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Field from 'components/common/Field';
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
      },
      values: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        repeatPassword: ''
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        repeatPassword: false,
      },
      responseStatusVisible: false,
      responseText: ""
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
              },
              values: {
                ...prevState.values,
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
    const { styles } = this.props;
    const { user, values, errors, responseStatusVisible } = this.state;
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
          <div className="form-container card">

            { responseStatusVisible && 
              <div>
                <h2>
                  { this.state.responseText }
                </h2>
              </div>
            }

            { !responseStatusVisible &&
              <form className="form card-body">
                <Field
                      id="firstName"
                      labelText="firstName"
                      type="text"
                      placeholder={values.firstName}
                      name="firstName"
                      value={values.firstName}
                      onChange={this.onChange}
                      error={errors.firstName}
                    />
                <Field
                      id="lastName"
                      labelText="User lastName"
                      type="text"
                      placeholder={this.state.lastName}
                      name="lastName"
                      value={values.lastName}
                      onChange={this.onChange}
                      error={errors.lastName}
                    />
                <Field
                      id="email"
                      labelText="Email"
                      type="text"
                      placeholder={this.state.email}
                      name="email"
                      value={values.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                <Field
                      id="phoneNumber"
                      labelText="phoneNumber"
                      type="text"
                      placeholder={this.state.phoneNumber}
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={this.onChange}
                      error={errors.phoneNumber}
                    />
                <Field
                      id="password"
                      labelText="Password"
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={values.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                <Field
                  id="repeatPassword"
                  labelText="Repeat password"
                  type="password"
                  placeholder="Repeat password"
                  name="repeatPassword"
                  value={values.repeatPassword}
                  onChange={this.onChange}
                  error={errors.repeatPassword}
                />
                <button
                  type="submit"
                  className="btn"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    );
  }
}
