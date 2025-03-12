<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        Column
      </div>

      <div class="col">
        <div class="d-flex justify-content-center">
          <MapComponent
              :markers="trailMarkers"
              :useCustomMarkers="true"
              :center="[58.5983, 25.0136]"
              :zoom="8"
              :width="'100%'"
              :height="'620px'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrailService from "@/service/TrailService";
import MapComponent from "@/components/MapComponent.vue";

export default {
  name: "TrailView",
  components: {MapComponent},
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
  computed: {
    trailMarkers() {
      const markers = [];
      markers.push({
        name: this.trail.startName,
        latitude: this.trail.startLatitude,
        longitude: this.trail.startLongitude,
        sequence: 0
      })
      if (this.trail.locationStopDtos.length > 0) {
        this.trail.locationStopDtos.forEach(locationStop => {
          markers.push({
            latitude: locationStop.latitude,
            longitude: locationStop.longitude,
            sequence: locationStop.sequence
          })
        })
      }
      return markers;
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