import React, { Component } from 'react';
import Field from 'components/common/Field';
import { baseUrl } from 'utils/api';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      email: 'user1@gmail.com.ua',
      password: 'password1',
      repeatPassword: '',
      errors: {
        email: false,
        password: false,
        repeatPassword: false
      },
      forgotPassVisible: false,
      responseStatusVisible: false,
      responseText: ""
    };
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onForgot = (event) => {
    this.setState({
      forgotPassVisible: true
    });
  };
  onForgotBack = (event) => {
    this.setState({
      forgotPassVisible: false,
      responseStatusVisible: false
    });
  };
  onForgotSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    fetch(`${baseUrl}forgotpassword/?email=${email}&api=${baseUrl}`)
    .then(resp => {
      if (resp.statusCode === 301) { return resp.json() }
    })
    .then(data => {
      console.log('onForgotSubmit', data)
      if (data && data.cause) {
          this.setState({
            forgotPassVisible: false,
            responseStatusVisible: true,
            responseText: data.cause
          });        
      }
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

    if (!emailRegExp.test(this.state.email)) {
      errors.email = 'Must be symbol @';
    }

    if (this.state.password < 8) {
      errors.password = 'Must be 8 characters or more';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
    } else {
      this.setState({
        errors: {}
      });

      const { email, password } = this.state;
      fetch(`${baseUrl}login`, {
        method: "POST",
        body: JSON.stringify({
          email, password
        }),
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
      })
      .then(data => 
        {
          console.log('DATA', data);
          if (data) {
            if (data.accessToken) {
              window.localStorage.setItem("jwt", data.accessToken);
              this.props.onLogin();
              location.reload(true);
            } else if (data.message) {
              this.setState({
                responseStatusVisible: true,
                responseText: data.message
              });        
            }
          }
      });
    }
  };

  render() {
    return (
      <div>
        <h2>Login Form</h2>
        <div className="form-container card">
            { this.state.responseStatusVisible && 
              <div>
                <h2>
                  { this.state.responseText }
                </h2>
              </div>
            }

            { this.state.forgotPassVisible && 
              <div>
                <Field
                      id="email"
                      labelText="Email"
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={this.state.errors.email}
                    />
                <button
                      type="submit"
                      className="btn"
                      onClick={this.onForgotSubmit}
                    >
                  Submit
                </button>
                <button
                      type="button"
                      className="btn"
                      onClick={this.onForgotBack}
                    >
                  Назад
                </button>
              </div>    
            }
           
            { !this.state.forgotPassVisible && 
              <div>
                <Field
                      id="email"
                      labelText="Email"
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={this.state.errors.email}
                    />
                <Field
                      id="password"
                      labelText="Password"
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={this.state.errors.password}
                    />
                <button
                      type="submit"
                      className="btn"
                      onClick={this.onSubmit}
                    >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={this.onForgot}
                >
                  Забыл пароль
                </button>              
              </div>
            }
        </div>
      </div>
    );
  }
}

export default LoginPage;
