<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  props: {
    center: { type: Array, default: () => [59.437, 24.7536] },
    zoom: { type: Number, default: 13 },
    markers: { // ADD THIS
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map)
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
