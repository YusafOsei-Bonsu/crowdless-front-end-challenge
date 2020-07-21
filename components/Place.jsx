import React from 'react';
import { Image } from 'reac-native';
import { Marker } from 'react-native-maps';

// This functional component represents each location as a busy-level image
const Place = ({ latitude, longitude, busyLvl }) => {
    let busy = busyLvl.toLowerCase();

    return (
        <Marker coordinate={ latitude, longitude }>
            <Image source={require(`../assets/${busy}.png`)} />
        </Marker>
    );
}

export default Place;