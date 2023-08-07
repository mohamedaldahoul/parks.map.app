// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import DATA from './data.json';
import Map from 'react-map-gl';
import  DeckGL,  { GeoJsonLayer } from 'deck.gl';

const MAPBOX_ACCESS_TOKEN ='pk.eyJ1IjoibW9oYW1lZGFsZGFob3VsIiwiYSI6ImNsbDBvNmIyZjAwMHkzZXA1OWxyenNqbmQifQ.qJzQG68GkZVBwvcZkjyLrw';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3,
  bearing: 0,
  pitch: 30
};

function Hello() {

  const onClick = info => {
    if (info.object) {
      alert(`${info.object.properties.Name}`)
    }
  }

  const layers = [
    new GeoJsonLayer({
      id: 'nationalParks',
      data: DATA,
      filled: true,
      pointRadiusMinPixels: 5,
      pointRadiusMaxPixels: 2000,
      getPointRadius: f => 5,
      getFillColor: data => data.properties.Name.includes('National Park') ? [0, 0, 0, 250] : [86, 144, 58, 250],
      pickable: true,
      autoHighlight: true,
      onClick,
    })
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      >
      <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default Hello;