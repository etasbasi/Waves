import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Button
} from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Location,
  Permissions,
  Constants
} from "expo";
import MapView, {
  Marker,
  animateToRegion,
  Animated,
  Callout
} from "react-native-maps";

const events = [
  {
    latitude: 39.018,
    longitude: -76.539,
    name: "Football game"
  },
  {
    latitude: -20,
    longitude: 15,
    name: "Emily's birthday"
  },
  {
    latitude: 45,
    longitude: 60,
    name: "Concert"
  }
];

export default class HomeScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    location: null,
    errorMessage: null
  };

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this._gotoCurrentLocation = this._gotoCurrentLocation.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "error, not a device"
      });
    } else {
      this._getLocationAsync();
    }
  }

  render() {
    // If the location is still being determined render Fetching Location else render the map
    if (this.state.latitude == null || this.state.longitude == null) {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>Fetching Location...</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            ref={ref => (this.mapView = ref)}
            // onPress={e => console.log(e.nativeEvent.coordinate)}
            customMapStyle={[]}
            style={{ flex: 1 }}
            provider="google"
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034
            }}
          >
            <Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
              }}
              title="Your Location"
            />
            {events.map((event, key) => (
              <Marker
                draggable
                key={key}
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude
                }}
              >
                <Callout tooltip={true}>
                  <View key={key} style={styles.customCallout}>
                    <Text>{event.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity
            onPress={this._gotoCurrentLocation}
            style={{
              width: 50,
              height: 50,
              bottom: 20,
              right: 20,
              position: "absolute",
              backgroundColor: "#ccc",
              borderRadius: 10
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50
              }}
              source={require("./../assets/images/focus.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  _gotoCurrentLocation() {
    this.mapView.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    this.setState({ location, latitude, longitude });
  };

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };
  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  customCallout: {
    height: 50,
    width: "auto",
    borderRadius: 5,
    backgroundColor: "rgba(220, 226, 237, 0.8)",
    borderWidth: 2,
    borderColor: "rgba(74, 84, 102, 1)",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },

  focusButton: {
    position: "absolute",
    width: 60,
    height: 60,
    margin: 50
  },

  focusImg: {},

  // container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  // },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
