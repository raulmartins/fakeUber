import React, { Component, Fragment } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Search from '../Search'
import Directions from '../Directions'
import apikey from '../../../google-apikey'
import { getPixelSize } from '../../utils'
import markerImage from '../../assets/marker.png'
import backImage from '../../assets/back.png'
import Details from '../Details'
import Geocoder from 'react-native-geocoding'
import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from './styles'

Geocoder.init(apikey)

const config = {
  timeout: 5000,
  enableHighAccuracy: true,
  maximumAge: 1000
}
export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude })
        const address = response.results[0].formatted_address
        const location = address.substring(0, address.indexOf(','))
        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }

        })
      },
      this.error,
      config
    )
  }

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude } } = geometry

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    })
    console.log('selecionado o endereco', this.state)
  }
  handleBack = () => {
    this.setState({ destination: null })
  }

  render() {
    const { region, destination, duration, location } = this.state
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration) })
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>
        {destination ?
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage}></Image>
            </Back>
            <Details />
          </Fragment> : <Search onLocationSelected={this.handleLocationSelected} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
