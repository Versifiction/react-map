import { ADD_MARKER, RESET_MARKERS } from "../constants/types";

const initialState = {
  initialPosition: [46.42081919374916, 2.4279785156250004],
  markers: JSON.parse(localStorage.getItem("markers")) || [],
  favoriteMarkers: [
    { lat: 43.68153285764856, lng: 7.184377312660217 },
    { lat: 48.93384093635751, lng: 2.2695028781890874 },
    { lat: 48.8534, lng: 2.3488 },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MARKER:
      console.log([...state.markers, action.payload]);
      localStorage.setItem(
        "markers",
        JSON.stringify([...state.markers, action.payload])
      );
      return { ...state, markers: [...state.markers, action.payload] };
    case RESET_MARKERS:
      localStorage.removeItem("markers");
      return { ...state, markers: [] };
    default:
      return state;
  }
}
