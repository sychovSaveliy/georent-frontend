
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../containers/Header';
import Field from '../../elements/Field';
import './style.scss';
import Button from '../../elements/Button';
import Footer from '../../containers/Footer/Footer';
import PersonInfoList from './PersonsInfo.JSON';

const infoList = PersonInfoList;

const PersonInformation = (props) => {
  const PersonInfoContent = props.infoList.map((person) => (
    <div key={person.userID} className="personalInfoWrapper">
      <img src={person.userPhoto} alt="#" />
      <h5>{person.userName} {person.userSurname}</h5>
      <p>{person.userAddress}</p>
      <p>+38 {person.userPhone}</p>
      <div>Rating: {person.userRating}</div>
    </div>
  )
  );
  return (
    <div>
      { PersonInfoContent }
    </div>
  );
};

export default class ProfilePage extends Component {
  constructor() {
    super();
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
	  const nameRegExp	= /^[a-zа-яієїґ\'\s]{2,30}$/i;


	  const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;


	  const phoneRegExp = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;

	  if (this.state.username.length < 3 && !nameRegExp.test(this.state.username)) {
	    errors.username = 'Must be 3 characters or more, only letters';
	  }

	  if (this.state.userSurname.length < 3 && !nameRegExp.test(this.state.userSurname)) {
	    errors.userSurname = 'Must be 3 characters or more';
	  }

	  if (!emailRegExp.test(this.state.email)) {
	    errors.email = 'Must be symbol @';
	  }

	  if (!phoneRegExp.test(this.state.phone)) {
	    errors.phone = 'Must be only digitals and +';
    }

    if (this.state.location.length===0) {
	    errors.location = 'Enter your location please';
    }
    
    if (this.state.oldPassword !== this.state.oldPassword) {
	    errors.oldPassword = 'Must be your old password';
    }

	  if (this.state.password < 3) {
	    errors.password = 'Must be 3 characters or more';
	  }

	  if (this.state.password !== this.state.repeatPassword) {
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

      // console.log('submit', this.state);
      
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
          <meta name="description" content="Profile Page"/>
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

          {/* <div className="personalInfoWrapper">
            <img src={avatarDemoPicture} alt="#" />
            <h5>James Bond</h5>
            <p>Geroev Stalingrada 15</p>
            <p>+38 000 000 00 00</p>
            <div>Rating</div>
          </div> */}

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
              value={this.state.username}
              onChange={this.onChange}
              error={this.state.errors.username}
            />
            <Field 
              id="userSurname"
              type="text"
              placeholder="Last Name*"
              name="userSurname"
              value={this.state.userSurname}
              onChange={this.onChange}
              error={this.state.errors.userSurname}
            />
            <Field 
              id="email"
              type="text"
              placeholder="Email*"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={this.state.errors.email}
            />
          </div>
          <div className="inputBlock">
            <h3>Contact Information</h3>
            <Field 
              id="phone"
              type="text"
              placeholder="Phone XXXXXXX"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
              error={this.state.errors.phone}
            />
            <Field 
              id="location"
              type="text"
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={this.state.errors.location}
            />
          </div>
          <div className="inputBlock">
            <h3>Change Password</h3>
            <Field 
              id="oldPassword"
              type="text"
              placeholder="Old password*"
              name="oldPassword"
              value={this.state.oldPassword}
              onChange={this.onChange}
              error={this.state.errors.oldPassword}
            />
            <Field 
              id="password"
              type="text"
              placeholder="New password*"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={this.state.errors.password}
            />
            <Field 
              id="repeatPassword"
              type="text"
              placeholder="New password again*"
              name="repeatPassword"
              value={this.state.repeatPassword}
              onChange={this.onChange}
              error={this.state.errors.repeatPassword}
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
};

