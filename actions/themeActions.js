import { SWITCH_THEME } from "./types";

export const switchTheme = () => dispatch => {
  dispatch({ type: SWITCH_THEME });
};
