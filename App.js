import React from 'react';
import MapView, { PROVIDER_GOOGLE,  Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import Axios from 'axios';
import { API_KEY } from "@env";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      places: []
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

      this.setState({ initialPosition });
    }, err => {
      Alert.alert(err.message)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // Fetches places based on timestamp & user location 
  getPlaces = () => {
    const apiEndpoint = "https://crowdless.com/default/places";
    
    let currentDate = new Date();
    let timestamp = currentDate.toUTCString(); 

    console.log(`${apiEndpoint}\n${API_KEY}\n${timestamp}`);

    // const body = {
    //   coords: { lat: location.latitude, lng: location.longitude },
    //   time_stamp: ""
    // }
  }

  showCallout = (place) => console.log(`Show callout called ${place}`);

  componentDidMount() {
    this.findCurrentLocation();
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