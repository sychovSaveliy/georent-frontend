import React from 'react';
import PropTypes from 'prop-types';
import {
  Map as LeafletMap, TileLayer, Marker, Popup
} from 'react-leaflet';
const RentMap = ({ styles, lots }) => {
  //console.log(lots);
  return (
      <LeafletMap
        center={[50.436795, 30.5305163]}
        zoom={14}
        maxZoom={20}
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        easeLinearity={0.35}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {lots.map((item) => (
          <Marker key={item.id} position={[item.coordinates.latitude, item.coordinates.longitude]}>
            <Popup>
              {item.description.lotName}
            </Popup>
          </Marker>          
        ))}
      </LeafletMap>
);
};

RentMap.propTypes = {
  styles: PropTypes.object.isRequired
};

export default RentMap;