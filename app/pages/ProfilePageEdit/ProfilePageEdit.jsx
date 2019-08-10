import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Field from 'components/common/Field';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { baseUrl, getData } from 'utils/api';
import { Button } from 'primereact/button';
import {Growl} from "primereact/growl";


class ProfilePage extends Component {
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
        phoneNumber: "",
        password: '',
        repeatPassword: ''
      },
      errors: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        password: false,
        repeatPassword: false,
      },
      responseStatusVisible: false,
      responseText: "",
      newPassVisible: false
    };
  };
  componentDidMount = () => {
    let token = window.localStorage.getItem('jwt');
    fetch(`${baseUrl}user`, {
      method: "GET",
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Headers': 'authorization',
        'Authorization': `Bearer ${token || ''}`
      }
    })
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
      })
      .then(data => {
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


  formValidatorPass = (values) => {
    let errors = {};
    let passwordRegExp = /[^A-Za-z0-9_-]/;

    if (this.state.values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }

    if (this.state.values.password.length > 64) {
      errors.password = 'Must be 64 characters or less';
    }

    if (passwordRegExp.test(this.state.values.password)) {
      if (errors.password != null && errors.password.length > 0) {
        errors.password += ' Must be only latin letters or numbers';
      }
      else {
        errors.password = 'Must be only latin letters or numbers';
      }
    }

    if (this.state.values.password !== this.state.values.repeatPassword) {
      errors.repeatPassword = 'Must be equal password';
    }

    return errors;
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
      const { firstName, lastName, phoneNumber } = this.state.values;
      fetch(`${baseUrl}user`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Headers': 'authorization',
          'Authorization': `Bearer ${window.localStorage.getItem("jwt") || ''}`,
        },
        body: JSON.stringify({
          firstName, lastName, phoneNumber
        }),
      })
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          if (data.message) {
            this.growl.show({severity: 'success', summary: `${data.message}`});
            this.setState({
              newPassVisible: false,
              responseStatusVisible: true,
              responseText: data.message
            });
          } else {
            this.growl.show({severity: 'error', summary: `${data.cause}`});
            this.setState({
              newPassVisible: false,
              responseStatusVisible: true,
              responseText: data.cause
            });
          }
        })
        .catch(error => {
          console.log('ERROR')
          this.growl.show({severity: 'error', summary: `${error.message}`});
        });
    }
  };

  onNewPassword = (event) => {
    event.preventDefault();
    this.setState({
      newPassVisible: true
    });

  };

  onNewPassBack = (event) => {
    this.setState({
      newPassVisible: false
    });
  };

  onChangePassword = (event) => {
    event.preventDefault();
    let errors = this.formValidatorPass(this.state.values);
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: {}
      });
      console.log("submit", this.state);
      let token = window.localStorage.getItem('jwt');
      const { password } = this.state.values;

      fetch(`${baseUrl}user/password`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Headers': 'authorization',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify({
          password
        })
      })
        .then(resp => {
          console.log('resp', resp);
          if (resp.status === 200) {
            this.setState({
              password: '',
              repeatPassword: ''
            });
          }
          return resp.json()
        })
        .then(data => {
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
    const { user, values, errors, responseStatusVisible, newPassVisible } = this.state;
    return (
      <div className={styles.feature}>
        <Growl ref={(el) => this.growl = el} />
        <Helmet>
          <title>Profile Page</title>
          <meta
            name="description"
            content="Profile Page"
          />
        </Helmet>
        {!newPassVisible &&
          <h2>Profile</h2>
        }
        {newPassVisible &&
          <h2>Profile - > change password</h2>
        }
        <div className={styles.profileEditWrapper}>
          {!newPassVisible &&
            <div>
              <Link to="/user/lots">My staff</Link><br />
              <Link to="/create-ad">New staff</Link>
            </div>
          }
          <div className="form-container card">
            <form className="form card-body">
              {!newPassVisible &&
                <div>
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
                  <Button
                    label='Reset'
                    type='button'
                    className="btn"
                    onClick={this.onReset}
                  >
                  </Button>
                  <Button
                    label='Save'
                    className="btn"
                    onClick={(e) => {
                      this.onSubmit(e);
                      setTimeout(() => {
                        this.props.history.push("/profile")
                      }, 2500);
                    }}
                  >
                  </Button>
                  <Button
                    label='Change password'
                    type="submit"
                    className="btn"
                    onClick={this.onNewPassword}
                  >
                  </Button>
                </div>
              }
              {newPassVisible &&
                <div>
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
                  <div>
                    <Button
                      label='Change password'
                      type="submit"
                      className="btn"
                      onClick={this.onChangePassword}
                    >
                    </Button>
                    <Button
                      label='Back'
                      type="button"
                      className="btn"
                      onClick={this.onNewPassBack}
                    >
                    </Button>
                  </div>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);
