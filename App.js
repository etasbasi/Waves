import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, Location, Permissions, Constants } from 'expo';
import MapView, { Marker } from 'react-native-maps';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    location: null,
    errorMessage: null
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'error, not a device'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    this.setState({ location, latitude, longitude });
  }

  render() {

    if (this.state.latitude == null || this.state.longitude == null) {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>Fetching Location...</Text>
        </View>
      );
    } else {
      return (
        <MapView style={{flex: 1}} provider="google"
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          }}
        ></MapView>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  }
});
