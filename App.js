import React from 'react';
import MapView, { PROVIDER_GOOGLE,  Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0.0,
      longitude: 0.0,
    }
  }
  
  // Gets the current location of the user
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));
    });
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
          style={styles.mapStyle}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          <Marker
            coordinate={{ latitude: 37.7825259, longitude: -122.4351431 }}
            title={"San Francisco"}>
  
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