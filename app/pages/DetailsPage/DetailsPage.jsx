import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { baseUrl, getData} from 'utils/api';

export default class DetailsPage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }
  
  constructor() {
    super();
    this.state = {
      lot: {}
    };
  };

  componentDidMount = () => {
      fetch(`${baseUrl}lot/${this.props.match.params.lotId}`)
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
     	})   
      .then(data => 
        {
          console.log('DATA', data);
          this.setState({
            lot: data
          });
      });
  }

  render() {
    const { styles } = this.props;
    const { lot : {
    	id,
    	price,
    } } = this.state;
    return (
      <div>
      		<h1>id {id}</h1>
      		<h1>price {price}</h1>
      </div>
    );
  }
}