<template>
  <div class="map-wrapper" :style="{ width: width, height: height }">
    <div ref="mapContainer" class="map-container" style="width: 100%; height: 100%;"></div>
    <button
        v-if="isTrailPage || isEditPage"
        @click="clearMarkers"
        class="btn btn-danger clear-markers-btn"
    >
      Clear Markers
    </button>
    <div v-else-if="isHomePage" class="map-overlay-dropdown">
      <div class="dropdown">
        <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Filter by
        </button>
        <ul class="dropdown-menu">
          <li v-for="type in types" :key="type.typeId">
            <a class="dropdown-item pointer" @click="emitFilter(type.typeId)">{{ type.name }}</a>
          </li>
          <li>
            <a class="dropdown-item pointer clear-item" @click="emitFilter(null)">clear</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

export default {
  props: {
    types: {
      type: Array,
      default: () => []
    },
    center: { type: Array, default: () => [0, 0] },
    zoom: { type: Number, default: 0 },
    markers: {
      type: Array,
      default: () => []
    },
    width: { type: String, default: '' },
    height: { type: String, default: '' },
    clickToAddMarker: { type: Boolean, default: false },
    useCustomMarkers: { type: Boolean, default: false }
  },
  data() {
    return {
      map: null,
      userMarkers: [],
      polyline: null
    };
  },
  computed: {
    isTrailPage() {
      return (
          this.$route.path === '/trail' ||
          this.$route.path.startsWith('/edit-trail/')
      );
    },
    isHomePage() {
      return this.$route.path === '/';
    }
  },
  methods: {
    emitFilter(typeId) {
      this.$emit('filter-selected', typeId);
    },

    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(this.map);
      console.log('olen siin')
      if (this.clickToAddMarker) {
        this.map.on('click', (e) => {
          const order = this.userMarkers.length;
          const customIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="marker-label">${order}</div>`,
            iconSize: [28, 28],
            iconAnchor: [1, 30]
          });
          const newMarker = L.marker(e.latlng, {icon: customIcon}).addTo(this.map);
          this.userMarkers.push(newMarker);

          // Create/update the polyline connecting all userMarkers (if more than one exists)
          const coordinates = this.userMarkers.map(marker => marker.getLatLng());
          if (coordinates.length > 1) {
            if (this.polyline) {
              this.polyline.setLatLngs(coordinates);
            } else {
              this.polyline = L.polyline(coordinates, {color: 'blue'}).addTo(this.map);
            }
          }

          this.$emit('marker-placed', {lat: e.latlng.lat, lng: e.latlng.lng});
        });
      }
    },

    addMarkers() {
      // Remove all existing markers from the map
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Clear userMarkers array
      this.userMarkers = [];

      if (this.useCustomMarkers) {
        // If markers prop is provided (e.g. in the edit view), add them to the map and push them into userMarkers
        if (this.markers && this.markers.length > 0) {
          this.markers.forEach((marker, index) => {
            const customIcon = L.divIcon({
              className: 'custom-marker-icon',
              html: `<div class="marker-label">${index}</div>`,
              iconSize: [28, 28],
              iconAnchor: [1, 30]
            });
            const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon: customIcon }).addTo(this.map);
            this.userMarkers.push(leafletMarker);
          });
        }
        // Update polyline connecting all markers (if there are at least two)
        const coordinates = this.userMarkers.map(marker => marker.getLatLng());
        if (coordinates.length > 1) {
          if (this.polyline) {
            this.polyline.setLatLngs(coordinates);
          } else {
            this.polyline = L.polyline(coordinates, { color: 'blue' }).addTo(this.map);
          }
        }

        // Calculate the total distance between consecutive markers in userMarkers:
        let totalDistance = 0;
        for (let i = 1; i < this.userMarkers.length; i++) {
          const prevLatLng = this.userMarkers[i - 1].getLatLng();
          const currLatLng = this.userMarkers[i].getLatLng();
          totalDistance += prevLatLng.distanceTo(currLatLng); // returns distance in meters
        }
        const distanceKm = totalDistance / 1000;
        const distanceKmRounded = parseFloat(distanceKm.toFixed(1));
        this.$emit('distance-calculated', distanceKmRounded);

        // After populating userMarkers and updating the polyline:
        const coordinatesForZoom = this.userMarkers.map(marker => marker.getLatLng());
        if (coordinatesForZoom.length > 0) {
          const bounds = L.latLngBounds(coordinatesForZoom);
          this.map.fitBounds(bounds, { padding: [50, 50] });
        }
      } else {
        // Default icon branch (without polyline)
        const defaultIcon = L.icon({
          iconUrl: markerIcon,
          shadowUrl: markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        this.markers.forEach(marker => {
          if (marker.latitude === 0 && marker.longitude === 0) return;
          const markerObj = L.marker([marker.latitude, marker.longitude], { icon: defaultIcon }).addTo(this.map);
          // // Bind a tooltip that displays the marker name when hovered over.
          // markerObj.bindTooltip(marker.name, {
          //   permanent: false, // Set to true if you want the tooltip always visible.
          //   direction: 'bottom',
          //   opacity: 0.8
          // });
          markerObj.on('click', () => {
            this.$emit('marker-clicked', marker.startId);
          });
        });
      }
    },

    clearMarkers() {
      // Remove all user-added markers
      this.userMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.userMarkers = [];

      // Remove polyline if it exists
      if (this.polyline) {
        this.map.removeLayer(this.polyline);
        this.polyline = null;
      }

      this.$emit('markers-cleared');
    }
  },

  mounted() {
    this.initializeMap();
  },

  watch: {
    markers(newMarkers) {
      this.addMarkers(); // Update map when markers prop changes
    }
  }
};
</script>
