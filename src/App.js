import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMarker, resetMarkers } from "./store/actions/map";
import "./App.css";

function MapChild({ addMarker }) {
  const map = useMapEvents({
    click: (e) => {
      addMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function App(props) {
  const { markers, initialPosition } = props;

  return (
    <div className="App" style={{ width: "100%", height: "100vh" }}>
      <h1>React Map</h1>
      <p>
        Cliquez sur la map pour placer un marqueur à l'endroit cliqué.
        <br /> Vous pouvez également supprimer l'ensemble des marqueurs crées
        sur la map en cliquant sur le bouton "Réinitialiser les marqueurs".
      </p>
      <MapContainer
        center={initialPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{
          width: "700px",
          height: "700px",
          zIndex: 1,
          margin: "0 auto",
          display: "block",
        }}
      >
        <MapChild addMarker={(e) => props.addMarker(e)} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers &&
          markers.map((marker, index) => (
            <Marker key={`marker-${index}`} position={[marker.lat, marker.lng]}>
              <Popup>
                <span>
                  Lat: {marker.lat} / Lng: {marker.lng}
                </span>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <button
        onClick={() => props.resetMarkers()}
        style={{ marginTop: "20px" }}
      >
        Réintialiser les marqueurs
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  markers: state.map.markers,
  initialPosition: state.map.initialPosition,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addMarker,
      resetMarkers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
