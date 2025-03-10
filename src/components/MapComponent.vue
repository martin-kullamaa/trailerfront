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
  methods: {

    initializeMap() {

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(this.map)
      // new function for click
      if (this.clickToAddMarker) {
        this.map.on('click', this.handleMapClick);
      }

      this.addMarkers();
    },

    // map click
    handleMapClick(e) {
      let markerFound = false;

      for (let i = this.userMarkers.length - 1; i >= 0; i--) {
        const markerPosition = this.userMarkers[i].getLatLng();
        if (e.latlng.distanceTo(markerPosition) < 10) { // Проверяем близость клика к маркеру
          this.map.removeLayer(this.userMarkers[i]); // Удаление маркера с карты
          this.userMarkers.splice(i, 1); // Удаление маркера из массива
          markerFound = true;
          break; // Прерываем цикл, т.к. маркер найден и удален
        }
      }

      if (!markerFound) {
        this.addNewMarker(e.latlng); // Добавление нового маркера, если рядом не было найдено других
      }
    },


    //for new trail
    addNewMarker(latlng) {
      const customIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const newMarker = L.marker(latlng, {icon: customIcon}).addTo(this.map);
      newMarker.bindPopup("New Trail Point").openPopup();

      newMarker.on('click', () => {
        this.map.removeLayer(newMarker); // Удаление маркера с карты
        this.userMarkers = this.userMarkers.filter(marker => marker !== newMarker); // Удаление маркера из массива
      });

      this.userMarkers.push(newMarker); // Добавление нового маркера в массив
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

    clearUserMarkers() {
      this.userMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.userMarkers = [];
    },

  },

  mounted() {
    this.initializeMap();
  },
  watch: {
    markers(newMarkers) {
      this.clearUserMarkers();
      this.addMarkers();
    }
  }
}
</script>