import React from "react";
import DeckGL from "deck.gl";
import { StaticMap } from 'react-map-gl';
import {GeoJsonLayer, BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';

import settings from "./settings/settings.json"
import places_103 from "./data/103_places.geojson"

const INITIAL_VIEW_STATE = settings.mapInit;
export default class App extends React.Component 
{
  constructor(props) 
  {
    super();
  }
  componentDidMount() 
  {
    // will be used to fetch data from the api later
  }
  _renderLayers()
  {
    let layers = [];

    layers.push(
      new GeoJsonLayer({
        id: 'geojson-layer',
        data: places_103,
        pickable: true,
        // opacity: 0.7,
        stroked: true,
        filled: true,
        radiusScale: 1,
        radiusMinPixels: 1,
        radiusMaxPixels: 100,
        lineWidthMinPixels: 1,
        getRadius: 30,
        getFillColor: d => [250, 68, 156, 190]
      }) // end new geojson layer

      ); //end push layer

      layers.push(
        new TileLayer({
          data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

          minZoom: 0,
          maxZoom: 19,
          tileSize: 256,

          renderSubLayers: props => {
            const {bbox: {west, south, east, north} } = props.tile;

            return new BitmapLayer(props, {
              data: null,
              image: props.data,
              bounds: [west, south, east, north]
            });
          }

        }) // end new tile layer
  
      ); //end push layer
      
      return layers;
  }

  render() 
  {
    return (
      <div>
        }
        <DeckGL 
          initialViewState={INITIAL_VIEW_STATE} 
          layers={this._renderLayers()}
          controller={
            {
            touchZoom: true,
            touchRotate: true,
            keyboard: false
            }
          }
        >
          <StaticMap 
            mapStyle={settings.mapStyle} 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
            asyncRender={false}
            dragRotate={true}
            reuseMaps={true}
            preventStyleDiffing={true}
          />
        </DeckGL>
      </div >
    ); //end return
  }
}