import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SettingsList from "react-native-settings-list";
import { ExpoConfigView } from "@expo/samples";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { switchTheme } from "../actions/themeActions";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = { switchValue: false };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SettingsList borderColor="#c8c7cc" style={styles.container}>
          <SettingsList.Header
            headerText="General"
            headerStyle={{ color: "black", marginTop: 25 }}
          />
          <SettingsList.Item
            hasNavArrow={false}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasSwitch={true}
            title="Dark Mode"
          />
        </SettingsList>
      </View>
    );
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
    this.props.switchTheme();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20
  }
});

SettingsScreen.propTypes = {
  theme: PropTypes.string.isRequired,
  switchTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  { switchTheme }
)(SettingsScreen);
