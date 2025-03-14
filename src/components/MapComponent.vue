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
            <a class="dropdown-item pointer" @click="emitFilter(null)">clear</a>
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

      if (this.useCustomMarkers) {
        this.markers.forEach((marker, index) => {
          const customIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="marker-label">${index}</div>`,
            iconSize: [28, 28],
            iconAnchor: [1, 30]
          });
          L.marker([marker.latitude, marker.longitude], {icon: customIcon}).addTo(this.map);
        });
        // If not in click-to-add mode, update polyline using markers prop
        if (!this.clickToAddMarker) {
          const coordinates = this.markers.map(marker => L.latLng(marker.latitude, marker.longitude));
          if (coordinates.length > 1) {
            if (this.polyline) {
              this.polyline.setLatLngs(coordinates);
            } else {
              this.polyline = L.polyline(coordinates, {color: 'blue'}).addTo(this.map);
            }
          }
        }
      } else {
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
          const markerObj = L.marker([marker.latitude, marker.longitude], {icon: defaultIcon}).addTo(this.map);
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
