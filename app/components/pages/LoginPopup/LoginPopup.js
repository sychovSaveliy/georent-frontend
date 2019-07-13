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
      errors: {
        email: false,
        password: false
      }
    };
  };
  onChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };
/*  onResponse(resp) {
.then(data => {
          console.log('DATA',data);
          this.setState({
            [target]: data
          });
      });
    console.log(resp)
  };*/
  onSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

    if (!emailRegExp.test(this.state.email)) {
      errors.email = 'Must be symbol @';
    }

    if (this.state.password < 3) {
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
      .then(data => {
          console.log('DATA',data);
      });
    }
  };

  render() {
    return (
      <div>
        <h2>Login Form</h2>
        <div className="form-container card">
        <form className="form card-body">
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
        </form>
        </div>
      </div>
    );
  }
}

export default LoginPopup;
