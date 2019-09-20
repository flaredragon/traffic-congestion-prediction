import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './Map';
import './style.css';

const App = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <div>
    <div className="container teal borderXwidth">
  <a>Traffic Time Predictor</a>
  <a href="hdbscan.html">Event based Traffic</a>

</div>
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=geometry,places,drawing&key="
      loadingElement={<div style={{ height: `100%` }} />}
    />
    </div>
  );
};

render(<App />, document.getElementById('root'));
