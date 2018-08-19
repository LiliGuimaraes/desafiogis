import React, { Component } from 'react';

import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

const MyPopupMarker = ({ children, position }) => (
  <Marker position={position}>
    <Popup>{children}</Popup>
  </Marker>
);

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));

  return <div style={{ display: 'none' }}>{items}</div>;
};

const Coordinates = ({ latitude, longitude }) => (
  <div
    style={{
      position: 'absolute',
      zIndex: 1000,
      bottom: 0,
      alignSelf: 'center',
    }}>
    <p>
      latitude:
      {latitude}
    </p>
    <p>
      longitude:
      {longitude}
    </p>
  </div>
);

const Layer = ({ onClick }) => (
  <ul>
    <li>
      <input type="checkbox" name="layer" onClick={() => onClick('trueColor')} />
      <span>Raster Image - Sentinel 2(ESA) </span>
    </li>
  </ul>
);

const Histogram = () => (
  <div>
    <div>HISTOGRAMA DE NDVI</div>
  </div>
);

const SceneInformation = ({ infoScene, center }) => (
  <div>
    <div>Informações da Cena</div>
    <div>
      <p>Fuso Horário: {infoScene.timestamp}</p>
      <p>Horário Local: {infoScene.provider_scene}</p>
      <p>Área: km²</p>
      <p>Centróide (X,Y): {infoScene.center}</p>
    </div>
  </div>
);

const LastSelectPoint = ({ coordinate, resetCoordinates }) => (
  <div>
    <div>Ponto Selecionado</div>
    <div>
      <p>longitude: {coordinate && coordinate.lng}</p>
      <p>latitude: {coordinate && coordinate.lat}</p>
    </div>
    <div>
      <button onClick={() => resetCoordinates()}>
        Limpar Ponto Selecionado
      </button>
    </div>
  </div>
);

export default class MyMap extends Component {
  state = {
    center: [-10.6263, -45.78],
    zoom: 12,
    projection: 'EPSG: 4326',
    coordinates: [],
    activeLayer: {
      'openstreetmap': true,
      'trueColor': false
    },
    latitude: null,
    longitude: null,
  };

  onSetCoordinate = evt => {
    this.setState({
      coordinates: [...this.state.coordinates, evt.latlng],
    });
  };

  resetCoordinates = () => {
    this.setState({ coordinates: [] });
  };

  changeLayerVisibility = activeLayerKey => {
    this.setState(prevState => ({
      activeLayer: {
        ...prevState.activeLayer,
        [activeLayerKey]: !prevState.activeLayer[activeLayerKey],
      },
    }));
  };

onMouseMove = evt => {
  this.setState({
    latitude: evt.latlng.lat,
    longitude: evt.latlng.lng,
  });
};

render() {
  const coordinates = this.state.coordinates;
  const center = [this.state.latitude, this.state.longitude];
  const markers = coordinates.map((item, key) => {
    return {
      key: key,
      position: [item.lat, item.lng],
      children: `popup ${key}`,
    };
  });

  const lastCoordinate = coordinates[coordinates.length - 1];

  const infoScene = {
    timestamp: '2016-11-26T __ 13:22:31.462Z',
    provider_scene: 'SENTINEL2:23/L/MJ/2016/11/26/0',
  };

  var MapContainer = {
    position: 'relative',
    borderStyle: 'solid',
    borderWidth: '2px',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
  };

  const rasterCoord = {
    "coordinates": [
      [
        [
          -45.813981,
          -10.575509
        ],
        [
          -45.81416,
          -10.643424
        ],
        [
          -45.763147,
          -10.643553
        ],
        [
          -45.762979,
          -10.575636
        ],
        [
          -45.813981,
          -10.575509
        ]
      ]
    ],
    "type": "Polygon"
  };

  return (
    <div>
      <div style={MapContainer}>
        <Map
          center={this.state.center}
          zoom={this.state.zoom}
          onClick={this.onSetCoordinate}
          onMouseMove={this.onMouseMove}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.activeLayer.trueColor && (
            <TileLayer
              attribution="Test"
              url="http://localhost:5000/tms/{z}/{x}/{y}.png"
              tms="true"
            />
          )}
          <MyMarkersList markers={markers} />
          <GeoJSON data={rasterCoord} />
        </Map>
        <Coordinates
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Layer onClick={this.changeLayerVisibility} />
        <Histogram />
        <SceneInformation infoScene={infoScene} center={center} />
        <LastSelectPoint
          coordinate={lastCoordinate}
          resetCoordinates={this.resetCoordinates}
        />
      </div>
    </div>
  );
}
}