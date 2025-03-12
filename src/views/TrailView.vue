<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
    </div>
  </div>
</template>

<script>
import TrailService from "@/service/TrailService";

export default {
  name: "TrailView",
  data() {
    return {
      startId: this.$route.params.startId,
      trail: {
        trailId: 0,
        profileId: 0,
        trailName: '',
        trailDescription: '',
        trailLength: 0,
        startName: '',
        startLatitude: 0,
        startLongitude: 0,
        locationStopDtos: [
          {
            latitude: 0,
            longitude: 0,
            sequence: 0
          }
        ]
      }
    }
  },
  methods: {


    getTrail() {
      TrailService.sendGetTrailRequest(this.startId)
          .then(response => this.trail = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
  },
  beforeMount() {
    this.getTrail()
  }
}
</script>