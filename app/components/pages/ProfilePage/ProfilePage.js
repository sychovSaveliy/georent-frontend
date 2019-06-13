/* eslint-disable no-mixed-spaces-and-tabs */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../containers/Header';
import Field from '../../elements/Field';
import './style.scss';
import Button from '../../elements/Button';
import Footer from '../../containers/Footer/Footer';
import PersonInfoList from './PersonsInfo.JSON';


const infoList = PersonInfoList;

const PersonInformation = (props) => (
  props.infoList.map((person) => (
    <div key={person.userID} className="personalInfoWrapper">
      <img src={person.userPhoto} alt="#" />
      <h5>{person.userName} {person.userSurname}</h5>
      <p>{person.userAddress}</p>
      <p>+38 {person.userPhone}</p>
      <div>Rating: {person.userRating}</div>
    </div>
  )
  )
);

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userSurname: '',
      email: '',
      phone: '',
      location: '',
      oldPassword: '',
      password: '',
      errors: {
        username: false,
        userSurname: false,
        email: false,
        phone: false,
        location: false,
        oldPassword: false,
        password: false,
        repeatPassword: false,
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
    const nameRegExp = /^[a-zа-яієїґ\'\s]{2,30}$/i;


    const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;


    const phoneRegExp = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;

    const {
      username,
      userSurname,
      email,
      phone,
      location,
      oldPassword,
      password,
      repeatPassword,
    } = this.state;

    if (username.length < 3 && !nameRegExp.test(username)) {
      errors.username = 'Must be 3 characters or more, only letters';
    }

    if (userSurname.length < 3 && !nameRegExp.test(userSurname)) {
      errors.userSurname = 'Must be 3 characters or more';
    }

    if (!emailRegExp.test(email)) {
      errors.email = 'Must be symbol @';
    }

    if (!phoneRegExp.test(phone)) {
      errors.phone = 'Must be only digitals and +';
    }

    if (location.length === 0) {
      errors.location = 'Enter your location please';
    }

    if (oldPassword !== this.oldPassword) {
      errors.oldPassword = 'Must be your old password';
    }

    if (password < 3) {
      errors.password = 'Must be 3 characters or more';
    }

    if (password !== repeatPassword) {
      errors.repeatPassword = 'Must be equal password';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
    } else {
      this.setState({
        errors: {}
      });

      fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          userSurname,
          email,
          phone,
          location,
          oldPassword,
          password,
          repeatPassword,
        })
      });
    }
  };

  render() {
    const {
      username,
      userSurname,
      email,
      phone,
      location,
      oldPassword,
      password,
      repeatPassword,
      errors
    } = this.state;
    return (
      <div className="profilePageWrapper">
        <Helmet>
          <title>Profile Page</title>
          <meta name="description" content="Profile Page" />
        </Helmet>
        <Header />
        <div className="subHeaderWrapper">
          <h3 className="subHeaderH3">Personal account</h3>
          <div className="btnWrapper">
            <Button text="+ Create an ad" active="active" />
          </div>
        </div>
        <div className="profilePageSideBar">
          <PersonInformation infoList={infoList} />
          <div>
            <h5>My profile</h5>
            <h5>My shared stuff</h5>
          </div>
          <div className="btnFormWrapper">
            <Button text="+ Create an ad" active="active" />
          </div>
          <Footer />
        </div>
        <div className="profileInputWrapper">
          <div className="inputBlock">
            <h3>General Information</h3>
            <Field
              id="username"
              type="text"
              placeholder="First Name*"
              name="username"
              value={username}
              onChange={this.onChange}
              error={errors.username}
            />
            <Field
              id="userSurname"
              type="text"
              placeholder="Last Name*"
              name="userSurname"
              value={userSurname}
              onChange={this.onChange}
              error={errors.userSurname}
            />
            <Field
              id="email"
              type="text"
              placeholder="Email*"
              name="email"
              value={email}
              onChange={this.onChange}
              error={email}
            />
          </div>
          <div className="inputBlock">
            <h3>Contact Information</h3>
            <Field
              id="phone"
              type="text"
              placeholder="Phone XXXXXXX"
              name="phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <Field
              id="location"
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={this.onChange}
              error={errors.location}
            />
          </div>
          <div className="inputBlock">
            <h3>Change Password</h3>
            <Field
              id="oldPassword"
              type="text"
              placeholder="Old password*"
              name="oldPassword"
              value={oldPassword}
              onChange={this.onChange}
              error={errors.oldPassword}
            />
            <Field
              id="password"
              type="text"
              placeholder="New password*"
              name="password"
              value={password}
              onChange={this.onChange}
              error={errors.password}
            />
            <Field
              id="repeatPassword"
              type="text"
              placeholder="New password again*"
              name="repeatPassword"
              value={repeatPassword}
              onChange={this.onChange}
              error={errors.repeatPassword}
            />
          </div>
          <div className="btnFormWrapper">
            <Button text="Edit" active="active" />
            <Button text="Safe" active="active" />
          </div>
        </div>
      </div>
    );
  }
}
