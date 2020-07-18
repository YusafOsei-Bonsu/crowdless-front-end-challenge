import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {/* Shows the entire map which covers the entire viewport */}
        <MapView style={styles.mapStyle} />
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