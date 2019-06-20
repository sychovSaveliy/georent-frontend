import React from 'react';
import PropTypes from 'prop-types';
import {
  Map as LeafletMap, TileLayer, Marker, Popup
} from 'react-leaflet';
import ItemList from './mock/ItemListFile.JSON';
const itemList = ItemList.list;
console.log(itemList)
const RentMap = ({ styles }) => (
      <LeafletMap
        center={[itemList[0].coordinates.latitude, itemList[0].coordinates.longitude]}
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
        {Object.values}
        {itemList.map((item) => (
          <Marker key={item.id} position={[item.coordinates.latitude, item.coordinates.longitude]}>
            <Popup>
              {item.description.lotName}
            </Popup>
          </Marker>          
        ))}
      </LeafletMap>
);

RentMap.propTypes = {
  styles: PropTypes.object.isRequired
};

export default RentMap;