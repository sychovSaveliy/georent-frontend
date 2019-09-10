import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { baseUrl, getData } from 'utils/api';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import {connect} from 'react-redux';
import { setAllLots } from 'actions/index'
const lotsList = {
  "list": [{
        "id": "id",
        "lotName": "lotName",
        "price": "price",
        "address": "address",
        "coordinates": {
          "longitude": 30.5805163,
          "latitude": 50.436795,           
        },
        "lotDescription": "lotDescription",
      },
      {
        "id": "id1",
        "lotName": "lotName",
        "price": "price",
        "address": "address",
        "coordinates": {
          "longitude": 30.5305163,
          "latitude": 50.436795,           
        },
        "lotDescription": "lotDescription",
      },
    ]
}

class RentMap extends Component  {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    allLots: PropTypes.array.isRequired,
    setAllLots: PropTypes.func,
  };

  componentDidMount = () => {
/*      fetch(`${baseUrl}lot/`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.props.setAllLots(data.lots)
        })*/
        this.props.setAllLots(lotsList.list)

  };

  render() {
    const { styles, allLots } = this.props;
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
        {allLots.map((item) => (
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
  allLots: state.allLots
})

const mapDispatchToProps = {
  setAllLots: setAllLots
}

export default connect(mapStateToProps, mapDispatchToProps)(RentMap);
