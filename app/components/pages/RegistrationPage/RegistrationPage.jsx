import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Field from '../../elements/Field';
import Check from '../../elements/Check';
import signup from '../../../images/signup.jpg';
import Header from '../../containers/Header';
/*import { validateName, validateEmail, validatePassword, validatePhone } from 'utils/formValidator.js';*/
export default class RegistrationPage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      agreeTerms: true,
      agreeConfidential: true,
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        repeatPassword: false,
        agreeTerms: false,
        agreeConfidential: false,
      }
    };
  }

	onChange = (event) => {
	  this.setState({
	    [event.target.name]: event.target.value
	  });
	};

	onCheck = (event) => {
	  this.setState({
	    [event.target.name]: event.target.checked
	  });
	};

	onSubmit = (event) => {
	  event.preventDefault();
	  const errors = {};
	  const nameRegExp	= /^[a-zа-яієїґ\'\s]{2,30}$/i;


	  const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;


	  const phoneRegExp = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;

	  if (this.state.firstName.length < 3 && !nameRegExp.test(this.state.firstName)) {
	    errors.firstName = 'Must be 3 characters or more, only letters';
	  }

	  if (this.state.lastName.length < 3 && !nameRegExp.test(this.state.lastName)) {
	    errors.lastName = 'Must be 3 characters or more';
	  }

	  if (!emailRegExp.test(this.state.email)) {
	    errors.email = 'Must be symbol @';
	  }

	  if (!phoneRegExp.test(this.state.phoneNumber)) {
	    errors.phoneNumber = 'Must be only digitals and +';
	  }

	  if (this.state.password < 3) {
	    errors.password = 'Must be 3 characters or more';
	  }

	  if (this.state.password !== this.state.repeatPassword) {
	    errors.repeatPassword = 'Must be equal password';
	  }

	  if (!this.state.agreeTerms) {
	    errors.agreeTerms = 'You should agree';
	  }

	  if (!this.state.agreeConfidential) {
	    errors.agreeConfidential = 'You should agree';
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
	    const {
	      firstName, lastName, email, phoneNumber, password, repeatPassword, agreeTerms, agreeConfidential
	    } = this.state;
	    fetch('http://ec2-54-173-110-187.compute-1.amazonaws.com:8080/register', {
	      method: 'POST',
	      headers: {
	        Accept: 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        firstName, lastName, email, phoneNumber, password, repeatPassword, agreeTerms, agreeConfidential
	      })
	    });
	  }
	};

	render() {
    const { styles } = this.props;
	  return (
    <div className={styles.registrationPage}>
      <Helmet>
        <title>Registration Page</title>
        <meta
        name="description"
        content="Feature page of React.js Boilerplate application"
      />
      </Helmet>

      <div className={styles.registrationPageLeft}>
        <p>Have some stuff to share?</p>
        <p>Easy way to earn money from stuff that is not in use</p>
        <img src={signup} />
        <p>Sign up and start to share</p>
      </div>
      <div className={styles.registrationPageRight}>
        <h2>Sign Up</h2>
        <div className="form-container card">
        <form className="form card-body">
      <Field
            id="firstName"
            labelText="firstName"
            type="text"
            placeholder="Enter firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            error={this.state.errors.firstName}
          />
      <Field
            id="lastName"
            labelText="User lastName"
            type="text"
            placeholder="Enter user lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
            error={this.state.errors.lastName}
          />
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
            id="phoneNumber"
            labelText="phoneNumber"
            type="text"
            placeholder="Enter phone (000)-000-0000"
            name="phone"
            value={this.state.phoneNumber}
            onChange={this.onChange}
            error={this.state.errors.phoneNumber}
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
      <Field
        id="repeatPassword"
        labelText="Repeat password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={this.state.repeatPassword}
        onChange={this.onChange}
        error={this.state.errors.repeatPassword}
      />
      <Check
            className="form-check-input"
            type="checkbox"
            id="agreeTerms"
            labelText="Confirm the Terms"
            name="agreeTerms"
            value={this.state.agreeTerms}
            defaultChecked={this.state.agreeTerms}
            onChange={this.onCheck}
            checked={this.state.agreeTerms}
            error={this.state.errors.agreeTerms}
          />
      <Check
            className="form-check-input"
            type="checkbox"
            id="agreeConfidential"
            labelText="Confirm the processing of data"
            name="agreeConfidential"
            value={this.state.agreeConfidential}
            defaultChecked={this.state.agreeConfidential}
            onChange={this.onCheck}
            checked={this.state.agreeConfidential}
            error={this.state.errors.agreeConfidential}
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
  </div>


	  );
	}
}
