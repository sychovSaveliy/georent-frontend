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
        firstName: "",
        lastName: "",
        phoneNumber: ""
      },
      errors: {
        firstName: false,
        lastName: false,
        phoneNumber: false
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
                phoneNumber: data.phoneNumber
              }
          }));
          console.log(this.state)
      });
  }
  onChange = event => {
    const newValues = {
      ...this.state.values,
      [event.target.name]: event.target.value
    };
    this.setState({
      values: newValues
    });
  };

  onReset = () => {
    this.setState({
      values: {
        firstName: "",
        lastName: "",
        phoneNumber: ""
      },
      errors: {}
    });
  };

  formValidator = (values) => {
    let errors = {};
    let textRegExp = /^[a-zа-яієїґ'\s]{2,30}$/i,
      numberRegExp = /^[0-9]{1,10}$/i;
    if (values.firstName.length < 3 && !textRegExp.test(values.firstName)) {
      errors.firstName = "Must be 3 characters or more, only letters";
    }
    if (values.lastName.length < 3 && !textRegExp.test(values.lastName)) {
      errors.lastName = "Must be 3 characters or more, only letters";
    }
    if (values.phoneNumber.length < 3 && !numberRegExp.test(price.phoneNumber)) {
      errors.phoneNumber = "Must be only numbers";
    }
    return errors;
  };

  onSubmit = event => {
    event.preventDefault();
    let errors = this.formValidator(this.state.values);
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: {}
      });
      console.log("submit", this.state);
      const { firstName, lastName, phoneNumber } = this.state.values;
      fetch(`${baseUrl}user`, {
        method: 'PATCH',
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Authorization': `Bearer ${window.localStorage.getItem("jwt") || ''}`,
        },
        body: JSON.stringify({
          firstName, lastName, phoneNumber
        }),
      }).then(resp => {
        console.log('resp', resp);
        if (resp.status === 201) {
          this.setState({
            firstName: '',
            lastName: '',
            phoneNumber: ''
          });
        }
        return resp.json();
      })
        .then(data => {
          console.log('DATA', data)
          if (data.message) {
            this.setState({
              responseStatusVisible: true,
              responseText: data.message
            });
          } else {
            this.setState({
              responseStatusVisible: true,
              responseText: data.cause
            });
          }
        });
    }
};
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
                      placeholder={values.lastName}
                      name="lastName"
                      value={values.lastName}
                      onChange={this.onChange}
                      error={errors.lastName}
                    />
                <Field
                      id="phoneNumber"
                      labelText="phoneNumber"
                      type="text"
                      placeholder={values.phoneNumber}
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={this.onChange}
                      error={errors.phoneNumber}
                    />
                <Link to="/login/newpass">Сменить пароль</Link>
                <button
                  type="submit"
                  className="btn"
                  onClick={this.onReset}
                >
                  Reset
                </button>
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
