<template>
    <div
        ref="mapContainer"
        class="map-container"
        :style="{ width: width, height: height }"
    ></div>
  <div v-if="isTrailPage">
    <button @click="clearMarkers" class="btn btn-danger">Clear Markers</button>
  </div>

</template>







<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


export default {
  props: {
    center: { type: Array, default: () => [0, 0] },
    zoom: { type: Number, default: 0 },
    markers: {
      type: Array,
      default: () => []
    },
    width: { type: String, default: '' },
    height: { type: String, default: '' },
    //click on the map
    clickToAddMarker: { type: Boolean, default: false }
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
    }
  },
  methods: {

    initializeMap() {

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(this.map)
      // new function for click
      if (this.clickToAddMarker) {
        this.map.on('click', (e) => {
          const customIcon = L.icon({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          const newMarker = L.marker(e.latlng, {icon: customIcon}).addTo(this.map);
          newMarker.bindPopup("New Trail Point").openPopup();
          this.userMarkers.push(newMarker);

          // Emit an event with the latitude and longitude of the new marker
          this.$emit('marker-placed', {lat: e.latlng.lat, lng: e.latlng.lng});
        });
      }
    },

    addMarkers() {
      console.log("olen siin")
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
      console.log('Marker icon URL:', markerIcon)
      console.log('Marker shadow URL:', markerShadow)
    },
    clearMarkers() {
      // Удаление каждого маркера с карты
      this.userMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      // Очистка массива userMarkers
      this.userMarkers = [];
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


