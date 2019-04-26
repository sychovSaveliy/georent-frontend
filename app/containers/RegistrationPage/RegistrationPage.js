import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import signup from '../../images/signup.jpg';

import Field from "components/Field";
import Check from "components/Check";

export default class RegistrationPage extends Component {
	constructor() {
		super();

		this.state = {
			username: "",
			userSurname: "",
			email: "",
			phone: "",
			password: "",
			repeatPassword: "",
			agreeTerms: true,
			agreeConfidential: true,
			errors: {
				username: false,
				userSurname: false,
				email: false,
				phone: false,
				password: false,
				repeatPassword: false,
				agreeTerms: false,
				agreeConfidential: false,
			}
		};
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onCheck = event => {
		this.setState({
			[event.target.name]: event.target.checked
		});
	};

	onSubmit = event => {
		event.preventDefault();
		const errors = {};
			let nameRegExp	= /^[a-zа-яієїґ'\s]{2,30}$/i,
				emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
				phoneRegExp = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;

		if (this.state.username.length < 3 && !nameRegExp.test(this.state.username)) {
			errors.username = "Must be 3 characters or more, only letters";
		}

		if (this.state.userSurname.length < 3 && !nameRegExp.test(this.state.userSurname)) {
			errors.userSurname = "Must be 3 characters or more";
		}

		if (!emailRegExp.test(this.state.email)) {
			errors.email = "Must be symbol @";
		}

		if (!phoneRegExp.test(this.state.phone)) {
			errors.phone = "Must be only digitals and +";
		}

		if (this.state.password < 3) {
			errors.password = "Must be 3 characters or more";
		}

		if (this.state.password !== this.state.repeatPassword) {
			errors.repeatPassword = "Must be equal password";
		}

		if (!this.state.agreeTerms) {
			errors.agreeTerms = "You should agree";
		}

		if (!this.state.agreeConfidential) {
			errors.agreeConfidential = "You should agree";
		}

		if (Object.keys(errors).length > 0) {
			this.setState({
				errors: errors
			});
		} else {
			this.setState({
				errors: {}
			});

			console.log("submit", this.state);
			const {username, userSurname, email, phone, password, agreeTerms, agreeConfidential} = this.state;
			fetch('https://httpbin.org/post', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({name: username, surname: userSurname, email: email, phone: phone, pass: password, terms: agreeTerms, confidential: agreeConfidential})
			});
		}
	};

	render() {
		return (
			<div className="registration-page">
				<Helmet>
					<title>Registration Page</title>
					<meta
						name="description"
						content="Feature page of React.js Boilerplate application"
					/>
				</Helmet>
				<div className="registration-page_left">
					<p>Have some stuff to share?</p>
					<p>Easy way to earn money from stuff that is not in use</p>
					<img src={signup} />
					<p>Sign up and start to share</p>
				</div>
				<div className="registration-page_right">
					<h2>Sign Up</h2>
					<div className="form-container card">
						<form className="form card-body">
							<Field
								id="username"
								labelText="Username"
								type="text"
								placeholder="Enter username"
								name="username"
								value={this.state.username}
								onChange={this.onChange}
								error={this.state.errors.username}
							/>
							<Field
								id="userSurname"
								labelText="User Surname"
								type="text"
								placeholder="Enter user surname"
								name="userSurname"
								value={this.state.userSurname}
								onChange={this.onChange}
								error={this.state.errors.userSurname}
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
								id="phone"
								labelText="Phone"
								type="text"
								placeholder="(000) 000-0000"
								name="phone"
								value={this.state.phone}
								onChange={this.onChange}
								error={this.state.errors.phone}
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
								onChange={this.onCheck}
								checked={this.state.agreeConfidential}
								error={this.state.errors.agreeConfidential}
							/>
							<button
								type="submit"
								className="btn btn-primary w-100"
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