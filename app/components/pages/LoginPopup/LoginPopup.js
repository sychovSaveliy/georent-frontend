import React, { Component } from 'react';
// import './style.scss';
import Field from '../../elements/Field';


// eslint-disable-next-line react/prefer-stateless-function
class LoginPopup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
      errors: {
        email: false,
        password: false,
        repeatPassword: false
      },
      forgotPassVisible: false,
      restorePassVisible: false,
      responceStatusVisible: false,
      responceText: ""
    };
  };
  onChange = (event) => {
    console.log(event.target.value)
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
      responceStatusVisible: false

    });
  };
  onForgotSubmit = (event) => {
    event.preventDefault();
    console.log('onForgotSubmit')
      const { email } = this.state;
      fetch('http://ec2-52-206-69-68.compute-1.amazonaws.com:8080/forgotpassword', {
        method: "POST",
        body: JSON.stringify({
          email
        }),
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.status === 200) {
          this.setState({
            forgotPassVisible: false,
            restorePassVisible: true
          });         
        } else {
            this.setState({
              responceStatusVisible: true,
              responceText: data.message
            });
        }
      });
  };
  onRestoreSubmit = (event) => {
    event.preventDefault();
    console.log('onRestoreSubmit')
  };
  onSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

    if (!emailRegExp.test(this.state.email)) {
      errors.email = 'Must be symbol @';
    }

    if (this.state.password < 8) {
      errors.password = 'Must be 3 characters or more';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
    } else {
      this.setState({
        errors: {}
      });

      console.log('submit', this.state);
      const { email, password } = this.state;
      fetch('http://ec2-52-206-69-68.compute-1.amazonaws.com:8080/login', {
        method: "POST",
        body: JSON.stringify({
          email, password
        }),
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => 
        {
          console.log('DATA',data);
          if (data.status === 200) {
            this.props.history.push('/')
          } else {
            this.setState({
              responceStatusVisible: true,
              responceText: data.message
            });        
          }
      });
    }
  };

  render() {
    return (
      <div>
        <h2>Login Form</h2>
        <div className="form-container card">
          <form className="form card-body">

            { this.state.responceStatusVisible && 
              <div>
                <h2>
                  { this.state.responceText }
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
            
            { this.state.restorePassVisible && 
              <div>
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
                <Field
                      id="repeatPassword"
                      labelText="repeatPassword"
                      type="password"
                      placeholder="repeatPassword"
                      name="repeatPassword"
                      value={this.state.repeatPassword}
                      onChange={this.onChange}
                      error={this.state.errors.repeatPassword}
                    />
                <button
                      type="submit"
                      className="btn"
                      onClick={this.onRestoreSubmit}
                    >
                    Submit
                </button>
              </div>    
            }
            
            { !this.state.forgotPassVisible && !this.state.restorePassVisible &&
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
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPopup;
