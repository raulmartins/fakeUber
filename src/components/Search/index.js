import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Platform } from 'react-native'
import apikey from '../../../google-apikey'

export default class Search extends Component {
  state = {
    searchFocused: false
  }

  render() {

    const { onLocationSelected } = this.props
    const { searchFocused } = this.state
    return <GooglePlacesAutocomplete
      placeholder='Para onde...?'
      placeholderTextColor='#888'
      onPress={onLocationSelected}
      query={
        {
          key: apikey,
          languege: 'pt'
        }
      }
      textInputProps={
        {
          onFocus: () => { this.setState({ searchFocused: true }) },
          onBlur: () => { this.setState({ searchFocused: false }) },
          autoCapitalize: 'none',
          autoCorrect: false
        }
      }
      listViewDisplayed={searchFocused}
      styles={{
        container: {
          position: 'absolute',
          top: Platform.select({ ios: 60, android: 40 }),
          width: '100%'

        },
        textInput: {
          height: 54,
          margin: 0,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          borderRadius: 5,
          paddingTop: 0,
          paddingRight: 20,
          paddingBottom: 0,
          paddingLeft: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: '#DDD',
          fontSize: 18

        },
        textInputContainer: {
          flex: 1,
          backgroundColor: 'transparent',
          height: 54,
          marginHorizontal: 20,
          borderTopWidth: 0,
          borderBottomWidth: 0
        },
        description: {
          fontWeight: 'bold',
          fontSize: 16
        },

        listView: {
          borderWidth: 1,
          borderColor: '#DDD',
          backgroundColor: '#FFF',
          elevation: 5,
          marginHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 15,
        },
        row: {
          padding: 20,
          height: 58
        }
      }}
      fetchDetails
      enablePoweredByContainer={false}
    />
  }
}
