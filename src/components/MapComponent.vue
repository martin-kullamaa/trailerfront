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
    },

    addMarkers() {
      for (const marker of this.markers) {
        L.marker([marker.latitude, marker.longitude]).addTo(this.map);
      }
    }

  },

  mounted() {
    this.initializeMap()
    this.addMarkers()
  },

}
</script>

<!--<style>-->
<!--.map-container {-->
<!--  width: 80%;-->
<!--  height: 720px;-->
<!--}-->
<!--</style>-->
