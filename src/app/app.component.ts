import { Component } from '@angular/core';
import { circle, geoJSON, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import '../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';
// import * as L from 'leaflet';
import 'beautifymarker';
import 'leaflet';
import 'beautifymarker';

declare let L;

declare module 'leaflet' {
  namespace control {
    function coordinates(v: any);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LeafletDemo';
  map: L.Map;

  options = {
    layers: [
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        detectRetina: false
      }),
      //tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(13.736717, 100.523186)
  };

  layersControl = {
    baseLayers: {
      'Google Map': tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        detectRetina: false
      }),
      'google Sat': tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      'googleHybrid': tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      'googleTerrain': tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      'Esri Sat': L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; ' + '<a href="http://www.esri.com/">Esri</a>',
          maxZoom: 18,
        }),
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...', detectRetina: false
      })
    },
    overlays: {
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }


  beautifyOptions = {
    icon: 'plane',
    borderColor: '#8D208B',
    textColor: '#8D208B',
    backgroundColor: 'transparent'
  };


  /*   layers = [
      L.marker([13.736717, 100.523186], {
        icon: L.BeautifyIcon.icon(this.beautifyOptions)
      })
    ]; */

  // Need to manually create the feature group and have it added to the map
  featureGroup = L.featureGroup();
  layers = [this.featureGroup];

  drawOptions = {
    position: 'topleft',
    draw: {
      polyline: {
        shapeOptions: {
          color: '#f357a1',
          weight: 2
        }
      },
      polygon: {
        allowIntersection: false,
        drawError: {
          color: '#e1e100',
          message: '<strong>Oh snap!<strong> you can\'t draw that!'
        },
        shapeOptions: {
          color: '#bada55'
        }
      },
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/leaflet/images/marker-icon.png',
          shadowUrl: 'assets/leaflet/images/marker-shadow.png'
        })
      },
      circle: {
        shapeOptions: {
          color: '#aaaaaa'
        }
      }
    },
    edit: {
      featureGroup: this.featureGroup
    }
  };

  onDrawReady(map: L.Map) {
    console.log("ON MAP READY CALLED")
    console.log(map);
    // Extract GeoJson from featureGroup
    const data = this.featureGroup.toGeoJSON();
    const convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    console.log(data)
  };

  onMapReady(map: L.Map) {
    console.log("onMapReady")
    L.control.coordinates({}).addTo(map);
  }
}
