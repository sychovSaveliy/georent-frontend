import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Field from 'components/common/Field';
import Textarea from 'components/common/Textarea';
import PropTypes from 'prop-types';
import { baseUrl, getData } from 'utils/api';

export default class ProfilePage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      values: {
        lotName: "lotName",
        price: 200,
        address: "address",
        longitude: "30.520000",
        latitude: "50.350000",
        lotDescription: "lotDescription lotDescription lotDescription lotDescription",
        avatar: ""
      },
      errors: {
        lotName: false,
        price: false,
        address: false,
        longitude: false,
        latitude: false,
        lotDescription: false,
        avatar: false
      },
      responseStatusVisible: false,
      responseText: ""
    };
  };

  onChange = event => {
    const newValues = {
      ...this.state.values,
      [event.target.name]: event.target.value
    };
    this.setState({
      values: newValues
    });
  };

  onChangeImg = event => {
    const reader = new FileReader();
    reader.onload = event => {
      const newValues = {
        ...this.state.values,
        avatar: event.target.result
      };
      this.setState({
        values: newValues
      });
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.state.avatar)
};


  onReset = () => {
    this.setState({
      values: {
        lotName: "",
        price: "",
        address: "",
        longitude: "",
        latitude: "",
        lotDescription: ""
      },
      errors: {}
    });
  };
  formValidator = (values) =>  {
    let errors = {};
    let textRegExp  = /^[a-zа-яієїґ'\s]{2,30}$/i,
      numberRegExp = /^[0-9]{1,10}$/i;
      if (values.lotName.length < 3 && !textRegExp.test(values.lotName)) {
        errors.lotName = "Must be 3 characters or more, only letters";
      }
      if (values.price.length < 3 && !numberRegExp.test(price.userSurname)) {
        errors.price = "Must be only numbers";
      }
      if (values.address.length < 3 && !textRegExp.test(values.address)) {
        errors.address = "Must be 3 characters or more";
      }
      if (values.longitude.length < 3 && !textRegExp.test(values.longitude)) {
        errors.longitude = "Must be 3 characters or more";
      }
      if (values.latitude.length < 3 && !textRegExp.test(values.latitude)) {
        errors.latitude = "Must be 3 characters or more";
      }
      if (values.lotDescription.length < 3 && !textRegExp.test(values.lotDescription)) {
        errors.lotDescription = "Must be 3 characters or more";
      }
/*      if (!values.avatar) {
        errors.avatar = "Required";
      }*/
    return errors;
  };

  onSubmit = event => {
    event.preventDefault();
    let errors = this.formValidator(this.state.values);
      if (Object.keys(errors).length > 0) {
      // fail  
        this.setState({
          errors: errors
        });
      } else {
      // success  
        this.setState({
          errors: {}
      });
      console.log("submit", this.state);
      const { lotName, price, address, longitude, latitude, lotDescription, avatar } = this.state;
        let form = new FormData();
        let lot = {
          "lotName": JSON.stringify(lotName),
          "price": JSON.stringify(price),
          "address": JSON.stringify(address),
          "longitude": JSON.stringify(longitude),
          "latitude": JSON.stringify(latitude),
          "lotDescription": JSON.stringify(lotDescription),
        };
/*        lot = {"price":"5000","longitude":"30.6000000","latitude":"50.4365056","address":"205 Киев 14","lotName":"lotName14 Відрадний","lotDescription":" Відрадний lotDescription lotDescription"};*/
        lot = JSON.stringify(lot);
        form.append('lot',lot);
        let imagedata = document.querySelector('input[type="file"]').files[0];
        form.append('files',imagedata);
        console.log('form data', form);
        fetch(`${baseUrl}user/lot/upload-picture`, {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': 'authorization',
             'Authorization': `Bearer ${window.localStorage.getItem("jwt") || ''}`,
          },
          body: form
        }).then(resp => {
          console.log('resp', resp);
          if (resp.status === 201) {
            this.setState({
              lotName: '',
              price: '',
              address: '',
              longitude: '',
              latitude: '',
              lotDescription: ''
            });
          }
          return resp.json()
        })
        .then(data => {
            console.log('DATA', data)
            if (data.message) {
              this.setState({
                  responseStatusVisible: true,
                  responseText: data.message
              });
            } else {
              this.setState({
                  responseStatusVisible: true,
                  responseText: data.cause
              });
            }
        });
    }
  };

  render() {
    const { styles } = this.props;
    const { values, errors } = this.state;
    return (
      <div className={styles.feature}>
        <Helmet>
          <title>Create Ad Page</title>
          <meta name="description" content="Create Ad Page" />
        </Helmet>
          { this.state.responseStatusVisible && 
            <div>
              <h2>
                { this.state.responseText }
              </h2>
            </div>
          }
        <Field
          id="lotName"
          labelText="lotName"
          type="text"
          placeholder="Enter lotName"
          name="lotName"
          value={values.lotName}
          onChange={this.onChange}
          error={errors.lotName}
        />
        <Field
          id="price"
          labelText="price"
          type="text"
          placeholder="Enter price"
          name="price"
          value={values.price}
          onChange={this.onChange}
          error={errors.price}
        />
        <Field
          id="address"
          labelText="address"
          type="text"
          placeholder="Enter address"
          name="address"
          value={values.address}
          onChange={this.onChange}
          error={errors.address}
        />
        <Field
          id="longitude"
          labelText="longitude"
          type="text"
          placeholder="Enter longitude"
          name="longitude"
          value={values.longitude}
          onChange={this.onChange}
          error={errors.longitude}
        />
        <Field
          id="latitude"
          labelText="latitude"
          type="text"
          placeholder="Enter latitude"
          name="latitude"
          value={values.latitude}
          onChange={this.onChange}
          error={errors.latitude}
        />
        <Field
          id="lotDescription"
          labelText="lotDescription"
          type="text"
          placeholder="Enter lotDescription"
          name="lotDescription"
          value={values.lotDescription}
          onChange={this.onChange}
          error={errors.lotDescription}
        />
        <div className='avatar'>
          {!(values.avatar) ? <img src='./images/default-avatar.59337bae.png' alt='' /> : <img src={values.avatar} alt='' />}
        </div>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="avatar"
              name="avatar"
              onChange={this.onChangeImg}
            />
            <label className="custom-file-label" htmlFor="avatar">Choose file</label>
            {errors.avatar ? <div className="invalid-feedback">{errors.avatar}</div> : null}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={this.onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={this.onSubmit}
        >
          onSubmit
        </button>
      </div>
    );
  }
}
