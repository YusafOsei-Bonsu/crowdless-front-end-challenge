# Crowdless Front-End Challenge

This mini-project focuses on creating a functional/class component (in React Native) that achieves the following use cases:
- Covers the entire viewport, shows user location, tracks user location (in component's state)
- Initially fetch places for a given user location and time.
- Display places as markers (images in attachment) with different colors on the map component. (green ⇔ not busy, orange ⇔ busy, red ⇔ very busy).

First, I set the map to fill the entire viewport. Next, I wrote code that located and tracked the user's current location. Afterward, using the Fetch API, I made multiple attempts to gather places from the Crowdless API. However, what I didn't realise that this was a dummy API; therefore, no responses were being received. This was when I proceeded to write the remaining code which would store and display places as icon-based markers on the map (which was guess-work, since I couldn't run the app without the API to provide the locational data).

Here are the steps to run the React Native app:
1. Run an Android emulator on Android Studio.
2. From the root directory, enter `npm start`/`expo start` in the termninal to run the app.
3. In the *Expo Developer Tools*, press `Run on Android device/emulator`.

## Tech Stack
- React Native
- JSX
- CSS styling

## Blockers/Resolutions

| Blockers        | Resolutions           | 
| --------------- |----------------------:| 
| Expo couldn't run app because `38.0.0 is not a valid sdk version`  | Entered `expo client:install:android` into the terminal to upgrade the expo client app |
| `Error: react-native-permissions: NativeModule.RNPermissions is null`  | Replaced all permission code with the built-in navigator geolocation |
| `TypeError: Network request failed` Axios has trouble with sending POST requests to the API | Informed the API was a "dummy" API, which means I wouldn't receive any responses if I sent requests to it |
| Unsure on how to append places into the state's list (i.e. places) | [Spread operator](https://medium.com/@thejasonfile/using-the-spread-operator-in-react-setstate-c8a14fc51be1) |