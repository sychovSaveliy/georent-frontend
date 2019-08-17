import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import Field from 'components/common/Field';
import Textarea from 'components/common/Textarea';
import PropTypes from 'prop-types';
import {baseUrl, getData} from 'utils/api';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import { withRouter } from 'react-router-dom';

class ProfilePage extends Component {
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
        avatar: []
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
      const pic = this.state.values.avatar;
      pic.push(event.target.result)
      const newValues = {
        ...this.state.values,
        avatar: pic
      };
      this.setState({
        values: newValues
      });
    };
    [...event.target.files].map((el) => reader.readAsDataURL(el))
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
  formValidator = (values) => {
    let errors = {};
    let textRegExp = /^[a-zа-яієїґ'\s]{2,100}$/i,
      nameRegExp = /^[a-zа-яієїґ'\s\d\-._]{2,100}$/i,
      numberRegExp = /^[0-9.]{1,10}$/i;
    if (values.lotName.length < 3 || !nameRegExp.test(values.lotName)) {
      errors.lotName = "Must be 3 characters or more, only letters";
    }
    if (values.price.length < 1 || !numberRegExp.test(values.price)) {
      errors.price = "Must be only numbers";
    }
    if (values.address.length < 3 || !textRegExp.test(values.address)) {
      errors.address = "Must be 3 characters or more";
    }
    if (values.longitude.length < 3 || !numberRegExp.test(values.longitude)) {
      errors.longitude = "Must be 3 characters or more";
    }
    if (values.latitude.length < 3 || !numberRegExp.test(values.latitude)) {
      errors.latitude = "Must be 3 characters or more";
    }
    // if (values.lotDescription.length < 3 || !textRegExp.test(values.lotDescription)) {
    //   errors.lotDescription = "Must be 3 characters or more";
    // }
    return errors;
  };


  onSubmit = event => {
    // event.preventDefault();
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
      console.log('AFTER')
      const {lotName, price, address, longitude, latitude, lotDescription, avatar} = this.state.values;
      let form = new FormData();
      let lot = {
        "lotName": lotName,
        "price": price,
        "address": address,
        "longitude": longitude,
        "latitude": latitude,
        "lotDescription": lotDescription,
      };
      lot = JSON.stringify(lot);
      form.append('lot', lot);
      // let imagedata = document.querySelector('input[type="file"]').files[0];
      let imagedata = this.state.values.avatar;
      form.append('files', imagedata);
      console.log('INPUT', document.querySelector('#avatar').files)

      let imagedataBase64 = this.state.values.avatar;
      if (imagedataBase64[0] == null) {
        form.append('filesBase64',"")
      }
      imagedataBase64.forEach(file => {
        form.append('filesBase64',file)
      });

      fetch(`${baseUrl}user/lot/upload-picture`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Authorization': `Bearer ${window.localStorage.getItem("jwt") || ''}`,
        },
        body: form
      }).then(resp => {
        return resp.json();
      })
        .then(data => {
          if (data.message) {
            setTimeout(() =>
                this.props.history.push("/profile")
              , 2000);
            this.growl.show({severity: 'success', summary: `${data.message}`});
            this.setState({
              responseStatusVisible: true,
              responseText: data.message
            });
          } else {
            this.growl.show({severity: 'error', summary: `${data.cause}`});
            this.setState({
              responseStatusVisible: true,
              responseText: data.cause
            });
          }
        })
        .catch(error => {
          this.growl.show({severity: 'error', summary: `${error.message}`});
        });

    }
  };

  render() {
    const {styles} = this.props;
    const {values, errors} = this.state;
    return (
      <div className={styles.feature}>
        <Helmet>
          <title>Create Ad Page</title>
          <meta name="description" content="Create Ad Page"/>
        </Helmet>
        <div className={styles.createAdWrapper}>
          <Growl ref={(el) => this.growl = el} />
          <Field
            id="lotName"
            labelText="Lot Name"
            type="text"
            placeholder="Enter lotName"
            name="lotName"
            value={values.lotName}
            onChange={this.onChange}
            error={errors.lotName}
          />
          <Field
            id="price"
            labelText="Price"
            type="text"
            placeholder="Enter price"
            name="price"
            value={values.price}
            onChange={this.onChange}
            error={errors.price}
          />
          <Field
            id="address"
            labelText="Address"
            type="text"
            placeholder="Enter address"
            name="address"
            value={values.address}
            onChange={this.onChange}
            error={errors.address}
          />
          <Field
            id="longitude"
            labelText="Longitude"
            type="text"
            placeholder="Enter longitude"
            name="longitude"
            value={values.longitude}
            onChange={this.onChange}
            error={errors.longitude}
          />
          <Field
            id="latitude"
            labelText="Latitude"
            type="text"
            placeholder="Enter latitude"
            name="latitude"
            value={values.latitude}
            onChange={this.onChange}
            error={errors.latitude}
          />
          <Textarea
            id="lotDescription"
            labelText="Lot Description"
            type="text"
            placeholder="Enter lotDescription"
            name="lotDescription"
            value={values.lotDescription}
            onChange={this.onChange}
            error={errors.lotDescription}
          />
          <div className='lot_image'>
            {!(values.avatar) ? null :
               ((values.avatar).map((el, i) => <img key={i} src={el} alt=''/>))
              }
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
          <div>
            <Button
              label='Reset'
              type="button"
              className="btn"
              onClick={this.onReset}
            >
            </Button>
              <Button onClick={() => this.onSubmit()} label="Create Lot" className="btn" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);
