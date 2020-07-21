import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

// This functional component represents each location as a busy-level image
const Place = ({ key, latitude, longitude, busyLvl }) => {
    let busy = busyLvl.toLowerCase();

    // Displays location name in console
    const showCallout = (place) => {
        console.log(`Show callout called ${place}`);
    }

    return (
        <Marker coordinate={ latitude, longitude } onPress={showCallout(key)}>
            <Image source={require(`../assets/${busy}.png`)} />
        </Marker>
    );
}

export default Place;