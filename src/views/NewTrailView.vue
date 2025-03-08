<template>
  <div>
    <div class="container text-center">
      <div class="row">
        <div class="col col-4">

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label text-start d-block">Trail name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Trail name">
          </div>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label text-start d-block">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">Description</textarea>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label text-start d-block">Trail length (km)</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Trail length (km)">
          </div>

        </div>
        <div class="col">
          <div class="d-flex justify-content-center">
            <MapComponent
                :markers="locationStarts"
                :width="'80%'"
                :height="'720px'"
                :center="[58.5983, 25.0136]"
                :zoom="8"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
import MapComponent from "@/components/MapComponent.vue";

export default {
  name: "NewTrailView",
  components: {MapComponent},
  data() {
    return {
      newTrail: {
        profileId: 0,
        trailName: "string",
        trailDescription: "string",
        trailLength: 0,
        startName: "string",
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
    addNewTrail() {


    }
  }
}
</script>