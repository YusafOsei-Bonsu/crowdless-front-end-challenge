import React from 'react';
import MapView, { PROVIDER_GOOGLE,  Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import Place from './components/Place.jsx';
import { API_KEY } from "@env";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // Holds all the places retrieved from the API
      places: [],
      lat: 0.0,
      long: 0.0
    }
  }
  
  // Find the current location of the user
  findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      
      let initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }
      
      this.setState({ 
        initialPosition, 
        lat: position.coords.latitude, 
        long: position.coords.longitude 
      });
    }, err => {
      Alert.alert(err.message);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // Fetches places based on timestamp & user location 
  getPlaces = () => {
    // The API endpoint to get the places
    const url = "https://crowdless.com/default/places";
    // Converting current date into UTC timestamp
    const timestamp = new Date().toUTCString();

    // Fetching the places from the API
    fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        coords: { 
          lat: this.state.lat, 
          lng: this.state.long 
        },
        time_stamp: timestamp
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      // Appending the fetched places into the state 
      for (let place of data) {
        this.setState({ places: [...this.state.places, place] })
      }
    })
    .catch(error => {
      console.error(error);
    });

  }

  componentDidMount() {
    this.findCurrentLocation();
    this.getPlaces();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Expands the map to fit the entire viewport */}
        <MapView
          ref={map => this_map = map}
          style={styles.mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.initialPosition}>
          
          <Marker
            title={"Your current location"}
            coordinate={this.state.initialPosition && {
                latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude
              } || {
                latitude: 0,
                longitude: 0
              }
            } /> 

            {/* Showing each place as markers */}
            {this.state.places.map(place => <Place key={place.id} latitude={place.latitude} longitude={place.longitude} busyLvl={place.status}/> )}
            
        </MapView>

      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default App;