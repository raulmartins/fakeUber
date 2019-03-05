import React from 'react';
import MapViewDirections from 'react-native-maps-directions'
import apikey from '../../../google-apikey'

const Directions = ({ destination, origin, onReady }) => (

  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey={apikey}
    strokeWidth={3}
    strokeColor='#222'
  />
)

export default Directions
