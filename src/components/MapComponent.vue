<template>
  <!--  <div ref="mapContainer" class="map-container" :style="{ width: width, height: height }"></div>-->
  <!--  <div v-if="isTrailPage"><button @click="clearMarkers" class="btn btn-danger">Clear Markers</button></div>-->

  <div class="map-wrapper" :style="{ width: width, height: height }">
    <div ref="mapContainer" class="map-container" style="width: 100%; height: 100%;"></div>
    <button v-if="isTrailPage" @click="clearMarkers" class="btn btn-danger clear-markers-btn">
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
    center: {type: Array, default: () => [0, 0]},
    zoom: {type: Number, default: 0},
    markers: {
      type: Array,
      default: () => []
    },
    width: {type: String, default: ''},
    height: {type: String, default: ''},
    //click on the map
    clickToAddMarker: {type: Boolean, default: false},
    useCustomMarkers: {type: Boolean, default: false}
  },
  // new data for click
  data() {
    return {
      map: null,
      userMarkers: []
    };
  },
  computed: {
    isTrailPage() {
      return this.$route.path === '/trail';
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

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(this.map)

      if (this.clickToAddMarker) {
        this.map.on('click', (e) => {

          const order = this.userMarkers.length;

          // Create a custom icon using L.divIcon:
          const customIcon = L.divIcon({
            className: 'custom-marker-icon', // Use our custom-marker-icon class
            html: `<div class="marker-label">${order}</div>`, // Insert the order number if desired
            iconSize: [28, 28], // Adjust size as needed (includes border)
            iconAnchor: [1, 30] // Adjust anchor so it points to the clicked location
          });

          const newMarker = L.marker(e.latlng, {icon: customIcon}).addTo(this.map);

          // newMarker.bindPopup(order.toString()).openPopup();

          this.userMarkers.push(newMarker);

          const coordinates = this.userMarkers.map(marker => marker.getLatLng());
          if (this.trailPolyline) {
            this.trailPolyline.setLatLngs(coordinates);
          } else {
            this.trailPolyline = L.polyline(coordinates, {color: 'blue'}).addTo(this.map);
          }

          this.$emit('marker-placed', {lat: e.latlng.lat, lng: e.latlng.lng});
        });
      }
    },

    addMarkers() {

      if (this.useCustomMarkers) {
        this.markers.forEach((marker, index) => {
          const customIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="marker-label">${index}</div>`,
            iconSize: [28, 28],
            iconAnchor: [1, 30] // Adjust as needed for your layout
          })
          L.marker([marker.latitude, marker.longitude], {icon: customIcon})
              .addTo(this.map)

        })
        // Now, build an array of coordinates from the markers prop.
        const coordinates = this.markers.map(marker =>
            L.latLng(marker.latitude, marker.longitude)
        );

        // Update or create the polyline.
        if (this.trailPolyline) {
          this.trailPolyline.setLatLngs(coordinates);
        } else {
          this.trailPolyline = L.polyline(coordinates, { color: 'blue' }).addTo(this.map);
        }
      } else {

        const customIcon = L.icon({
          iconUrl: markerIcon,
          shadowUrl: markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        for (const marker of this.markers) {
          if (marker.latitude === 0 && marker.longitude === 0) continue;
          L.marker([marker.latitude, marker.longitude], {icon: customIcon})
              .addTo(this.map);
        }
      }
    },

    clearMarkers() {
      // Удаление каждого маркера с карты
      this.userMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      // Очистка массива userMarkers
      this.userMarkers = [];

      if (this.trailPolyline) {
        this.map.removeLayer(this.trailPolyline);
        this.trailPolyline = null;
      }

      this.$emit('markers-cleared');
    },


  },

  mounted() {
    this.initializeMap();
  },
  watch: {
    markers(newMarkers) {
      this.addMarkers();
    }
  }
}
</script>






