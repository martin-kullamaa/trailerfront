<template>
  <div
      ref="mapContainer"
      class="map-container"
      :style="{ width: width, height: height }"
  ></div>
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
    height: { type: String, default: '' }
  },
  methods: {

    initializeMap() {

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map)

      this.addMarkers()
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
        L.marker([marker.latitude, marker.longitude], { icon: customIcon })
            .addTo(this.map);
      }
      console.log('Marker icon URL:', markerIcon)
      console.log('Marker shadow URL:', markerShadow)
    }


  },

  mounted() {
    this.initializeMap()
  },
  watch: {
    markers() {
      this.addMarkers();  // Add only when markers exist
    }
  }

}
</script>