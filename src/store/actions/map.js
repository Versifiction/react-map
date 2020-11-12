import { ADD_MARKER, RESET_MARKERS } from "../constants/types";

export const addMarker = (position) => (dispatch) => {
  dispatch({
    type: ADD_MARKER,
    payload: position,
  });
};

export const resetMarkers = () => (dispatch) => {
  dispatch({
    type: RESET_MARKERS,
  });
};
