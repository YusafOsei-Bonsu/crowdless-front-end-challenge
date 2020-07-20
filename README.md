# Crowdless Front-End Challenge

This mini-project focuses on creating a functional/class component (in React Native) that achieves the following use cases:
- Covers the entire viewport, shows user location, tracks user location (in component's state)
- Initially fetch places for a given user location and time.
- Display places as markers (images in attachment) with different colors on the map component. (green ⇔ not busy, orange ⇔ busy, red ⇔ very busy).

First, I set the map to fill the entire viewport. Next, I wrote code that located and tracked the user's current location. 

## Tech Stack
- React Native

## Blockers/Resolutions

| Blockers        | Resolutions           | 
| --------------- |----------------------:| 
| Expo couldn't run app because `38.0.0 is not a valid sdk version`  | Entered `expo client:install:android` into the terminal to upgrade the expo client app |
| `Error: react-native-permissions: NativeModule.RNPermissions is null`  | Replaced all permission code with the built-in navigator geolocation |
| `Network Error` Axios has trouble with sending POST requests to the API |  |