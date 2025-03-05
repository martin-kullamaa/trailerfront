<template>
  <div class="d-flex justify-content-center">
    <MapComponent
        :markers="locationStarts"
        :width="'80%'"
        :height="'720px'"
        :center="[58.5983, 25.0136]"
        :zoom="8"
    />
  </div>
</template>

<script>
import LocationService from "@/service/LocationService";
import MapComponent from "@/components/MapComponent.vue";

export default {
  name: "HomeView",
  components: {MapComponent},
  data() {
    return {
      locationStarts: [{
        name: '',
        latitude: 0,
        longitude: 0
      }]
    }
  },
  methods: {

    sendLocationStartsRequest() {
      LocationService.sendLocationStartsRequest()
          .then(response => this.locationStarts = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

  },
  beforeMount() {
    this.sendLocationStartsRequest()
  }
}
</script>