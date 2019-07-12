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

const generalIfoFields = [
  {
  id : "username",
  type: "text",
  placeholder: "First Name*",
  name:"username",
  value:()=>{this.state.username},
  onChange:()=>{this.onChange},
  error:()=>{this.state.errors.username}
  },
  {
  id:"userSurname",
  type:"text",
  placeholder:"Last Name*",
  name:"userSurname",
  value:()=>{this.state.userSurname},
  onChange:()=>{this.onChange},
  error:()=>{this.state.errors.userSurname}
  },
  {
  id:"email",
  type:"text",
  placeholder:"Email*",
  name:"email",
  value:()=>{this.state.email},
  onChange:()=>{this.onChange},
  error:()=>{this.state.errors.email}
  }
];

const contactInfoFields =[
  {
    id:"phone",
    type:"text",
    placeholder:"Phone XXXXXXX",
    name:"phone",
    value:()=>{this.state.phone},
    onChange:()=>{this.onChange},
    error:()=>{this.state.errors.phone}
  },
  {
    id:"location",
    type:"text",
    placeholder:"Location",
    name:"location",
    value:()=>{this.state.location},
    onChange:()=>{this.onChange},
    error:()=>{this.state.errors.location}
  }
];

const changePasswordFields = [
  {
    id:"oldPassword",
    type:"text",
    placeholder:"Old password*",
    name:"oldPassword",
    value:()=>{this.state.oldPassword},
    onChange:()=>{this.onChange},
    error:()=>{this.state.errors.oldPassword},
  },
  {
    id:"password",
    type:"text",
    placeholder:"New password*",
    name:"password",
    value:()=>{this.state.password},
    onChange:()=>{this.onChange},
    error:()=>{this.state.errors.password}
  },
  {
    id:"repeatPassword",
    type:"text",
    placeholder:"New password again*",
    name:"repeatPassword",
    value:()=>{this.state.repeatPassword},
    onChange:()=>{this.onChange},
    error:()=>{this.state.errors.repeatPassword}
  }
];

const Fields_ = (props) => {
  return (
  props.list.map((item)=> (
      <Field
        id={item.id}
        type={item.type}
        placeholder={item.placeholder}
        name={item.name}
        value={item.value}
        onChange={item.onChange}
        error={item.error}
      />)
  ))
  };


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
            <Fields_ list={generalIfoFields} />
          </div>
          <div className="inputBlock">
            <h3>Contact Information</h3>
            <Fields_ list={contactInfoFields} />
          </div>
          <div className="inputBlock">
            <h3>Change Password</h3>
            <Fields_ list={changePasswordFields} />
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
