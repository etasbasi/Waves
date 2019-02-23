import { SWITCH_THEME } from "../actions/types";

import { Alert } from "react-native";

const initialState = "light";

export default function(state = initialState, action) {
  switch (action.type) {
    case SWITCH_THEME:
      const newTheme = state == "light" ? "dark" : "light";
      Alert.alert(newTheme);
      return newTheme;
    default:
      return state;
  }
}
