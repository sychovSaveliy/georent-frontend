import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { baseUrl, getData } from 'utils/api';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import {connect} from 'react-redux';
import { fetchLots } from 'actions/index'
import { lotsList } from './mock/lots'

class RentMap extends Component  {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    lots: PropTypes.array.isRequired,
    fetchLots: PropTypes.func,
  };

  componentDidMount = () => {
    const { lots, fetchLots } = this.props
    console.log('lots',lots)
    fetchLots(lotsList.list)
/*      fetch(`${baseUrl}lot/`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.props.fetchLots(data.lots)
        })*/
  };

  render() {
    const { styles, lots } = this.props;
    return (
      <LeafletMap
        center={[50.436795, 30.5305163]}
        zoom={10}
        maxZoom={20}
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        easeLinearity={0.35}
        className={styles.leaflet_container}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {lots.map((item) => (
          <Marker key={item.id} position={[item.coordinates.latitude, item.coordinates.longitude]}>
            <Popup>
              <Link to={`user/lot/${item.id}`}>{item.lotName}</Link>
            </Popup>
          </Marker>
          )
        )}
      </LeafletMap>
    );
  }
}

const mapStateToProps = (state) => ({
  lots: state.lots
})

const mapDispatchToProps = {
  fetchLots: fetchLots
}

export default connect(mapStateToProps, mapDispatchToProps)(RentMap);
