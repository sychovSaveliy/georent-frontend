import React, { Component } from "react";
import PropTypes from 'prop-types';
import LotsList from 'components/containers/LotsList';
import Footer from 'components/containers/Footer';
import RentMap from 'components/containers/RentMap';

export default class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      lots: []
    };
  }

  getLots = () => {
    const link = 'http://ec2-54-173-110-187.compute-1.amazonaws.com:8080/lot/';
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          lots: data
        });
        console.log(data)
      });
  };

  componentDidMount() {
    this.getLots();
  }

  render() {
    const { lots } = this.state;
    return (
      <div>
        <div className='content'>
          <LotsList lots={lots} />
          <div>
            <RentMap lots={lots} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
/*const HomePage = ({ styles }) => (
);
HomePage.propTypes = {
  styles: PropTypes.object.isRequired
};
export default HomePage;*/
