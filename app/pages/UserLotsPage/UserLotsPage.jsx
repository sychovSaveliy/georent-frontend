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
          'Authorization': `Bearer ${window.localStorage.getItem("jwt") || ''}`
        }
      })
      .then(resp => {
        console.log('resp', resp);
        return resp.text()
      .then(text => {
          const data = text && JSON.parse(text);
          if (!resp.ok) {
              if ([401, 403].indexOf(resp.status) !== -1) {
                  this.props.onExit();
                  this.props.history.push('/login');
                  //location.reload(true);
              }
              const error = (data && data.message) || resp.statusText;
              return Promise.reject(error);
          }
          return data;
        });
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
        { console.log(this.props.location, document.location.host) }
        <div className={styles.content}>
        { this.props.isLogged &&
          <LotsList lots={lotsAll} />
        }
        </div>
      </div>
    );
  }
}