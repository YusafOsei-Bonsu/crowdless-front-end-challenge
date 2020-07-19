import React from 'react';
import MapView, { PROVIDER_GOOGLE,  Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324
    }
  }
  
  // Find the current location of the user
  findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, err => {
      Alert.alert(err.message)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.findCurrentLocation();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Expands the map to fit the entire viewport */}
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>
          <Marker
            coordinate={{ 
              latitude: this.state.latitude, 
              longitude: this.state.longitude 
            }}
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