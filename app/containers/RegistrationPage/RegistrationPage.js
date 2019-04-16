import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as yup from 'yup';
import './style.scss';
import signup from '../../images/signup.jpg';

export default class RegistrationPage extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const signupValidationSchema = yup.object().shape({
      password: yup.string()
        .max(40, 'Please enter no more than 40 characters')
        .required('Please enter your password'),
      passwordConfirmation: yup.string()
        .max(40, 'Please enter no more than 40 characters')
        .required('Please enter a last name'),
      email: yup.string()
        .email('Please enter a valid email')
        .required('Please enter an email')
    });
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
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{ email: '', password: '', passwordConfirmation: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullname}
              />
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <label>Password</label>
              <input
                type="password"
                name="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <input
                type="checkbox"
                name="termsofuse"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.termsofuse}
              />
              <label>terms of use</label>
              <br/>
              <input
                type="checkbox"
                name="personaldata"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.personaldata}
              />
              <label>personal data</label>
              <button type="submit" disabled={isSubmitting}>
            Submit
              </button>
            </form>
          )}
        </Formik>
        </div>
      </div>
    );
  }
}