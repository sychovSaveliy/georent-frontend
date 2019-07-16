import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotsList from 'components/LotsList';
import { Helmet } from 'react-helmet';
import { baseUrl, getData} from 'utils/api';

export default class UserLotsPage extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  }
  
  constructor() {
    super();
    this.state = {
      lotsAll: []
    };
  };
  componentDidMount = () => {
      fetch(`${baseUrl}user/lots/`, {
        method: "GET",
        headers: {
          'Access-Control-Allow-Headers': 'authorization',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem("jwt")}`
        }
      })
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
      })
      .then(data => 
        {
          console.log('DATA', data);
          this.setState({
            lotsAll: data
          });
      });
  }


  render() {
    const { styles } = this.props;
    const { lotsAll } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <LotsList lots={lotsAll} />
        </div>
      </div>
    );
  }
}