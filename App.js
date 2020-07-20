import React from 'react';
import MapView, { PROVIDER_GOOGLE,  Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import Axios from "axios";
import { API_KEY } from "@env";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
        lat: initialPosition.latitude, 
        long: initialPosition.longitude 
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
    const apiEndpoint = "https://crowdless.com/default/places";
    // Converting current date into UTC timestamp
    const timestamp = new Date().toUTCString(); 
    // POST request body
    const body = {
      coords: { lat: this.state.lat, lng: this.state.long },
      time_stamp: timestamp
    }

    console.log("Fetching places..")
    // Fetches the initial places
    Axios.post(apiEndpoint, body, {
      headers: {
        "x-api-key": API_KEY
      }
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.error(err);
    });
    console.log("Fetching complete.")
  }

  showCallout = (place) => console.log(`Show callout called ${place}`);

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