
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../containers/Header';
import Input from '../../elements/Input';
import './style.scss';
import Button from '../../elements/Button';
import Footer from '../../containers/Footer/Footer';

export default class ProfilePage extends Component {
  render() {
    return (
      <div className='ProfilePageWrapper'>
        <Helmet>
          <title>Profile Page</title>
          <meta
            name="description"
            content="Profile Page"
          />
        </Helmet>
        <Header />

        <div className='SubHeaderWrapper'>
          <h3 className='SubHeaderH3'>Personal account</h3>
          <div className='BtnWrapper'>
            <Button text={'+ Create an ad'} active={'active'} />
          </div>
        </div>


          <div className='ProfilePageSideBar'>

            <div className='PersonalInfoWrapper'>
              <img/>
              <h5>James Bond</h5>
              <p>Geroev Stalingrada 15</p>
              <p>+38 000 000 00 00</p>
              <div>Rating</div>

            </div>
            <h5>My profile</h5>
            <h5>My shared stuff</h5>
            <Button text={'+ Create an ad'} active={'active'} />
            <Footer />c
          </div>

          <div className='ProfileInputWrapper'>
            <div>
              <h2>General Information</h2>
              <Input />
              <Input />
              <Input />
            </div>
            <div>
              <h2>Contact Information</h2>
              <Input />
              
              <Input />
            </div>
            <div>
              <h2>Change Password</h2>
              <Input />
              <Input />
              <Input />
            </div>
            <Button text={'Safe'} active={'active'} />
          </div>

      </div>
    );
  }
}

