import React from 'react';
import MapView, { PROVIDER_GOOGLE,  Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Platform, Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: null,
    }
  }
  
  // Gets the current location of the user
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));

      let initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      }

      this.setState({ initialPosition });
    },
    err => Alert.alert(err.message),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  }

  // Request permission to use device's location services
  requestLocationPermission = async () => {
  
    if (Platform.OS === "android") {
      // Requesting permission to access location service (Android)
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // Capture the user's current location after permission has been granted
      if (response === "granted") {
        this.locateCurrentPosition();
      }
    } else {
      // Requesting permission to access location service (iOS)
      let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      // Capture the user's current location after permission has been granted
      if (response === "granted") {
        this.locateCurrentPosition();
      }
    }
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Expands the map to fit the entire viewport */}
        <MapView 
          ref={map => this._map = map}
          style={styles.mapStyle}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.initialPosition}>
          <Marker
            coordinate={{ 
              latitude: this.state.initialPosition.latitude, 
              longitude: this.state.initialPosition.longitude }}
            title={"Your Current Position"}>
  
          </Marker>
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