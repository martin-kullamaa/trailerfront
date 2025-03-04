<template>
  <div>
    <MapComponent :markers="locationStarts"/>
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