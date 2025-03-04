<template>
  <div>
    SIIA TULEB KAART
  </div>
</template>

<script>
import LocationService from "@/service/LocationService";

export default {
  name: "HomeView",
  data() {
    return {
      locationStart: {
        name: '',
        latitude: 0,
        longitude: 0
      }
    }
  },
  methods: {

    sendLocationStartsRequest() {
      LocationService.sendLocationStartsRequest()
          .then(response => this.locationStart = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

  },
  beforeMount() {
    this.sendLocationStartsRequest()
  }
}
</script>