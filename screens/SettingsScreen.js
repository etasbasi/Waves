import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingsList>
          <SettingsList.Header headerText='First Grouping' headerStyle={{ color: 'white' }} />
          <SettingsList.Item
            hasNavArrow={false}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasSwitch={true}
            title='Switch Example'
          />
        </SettingsList>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    fontSize: 20,
  }
});