<template>
  <div>
    <div class="container text-center">
      <div class="row">
        <div class="col col-4">
          <div class="mb-3">
            <label for="trailName" class="form-label text-start d-block">Trail name</label>
            <input v-model="newTrail.trailName" type="text" class="form-control" id="trailName" placeholder="Trail name">
          </div>
          <div class="mb-3">
            <label for="trailDescription" class="form-label text-start d-block">Description</label>
            <textarea v-model="newTrail.trailDescription" class="form-control" id="trailDescription" rows="3" placeholder="Description"></textarea>
          </div>
          <div class="mb-3">
            <label for="trailLength" class="form-label text-start d-block">Trail length (km)</label>
            <input v-model="newTrail.trailLength" type="text" class="form-control" id="trailLength" placeholder="Trail length (km)">
          </div>
          <button @click="submitTrail" type="submit" class="btn btn-info">Continue</button>
          <button @click="" class="btn btn-secondary mt-2">Back</button>
        </div>
        <div class="col">
          <div class="d-flex justify-content-center">
            <MapComponent
                :clickToAddMarker="true"
                :center="[58.5983, 25.0136]"
                :zoom="8"
                @marker-placed="handleMarkerPlaced"
                @markers-cleared="resetTrailData"
                :width="'80%'"
                :height="'720px'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import TrailService from "@/service/TrailService";
import NavigationService from "@/service/NavigationService";

export default {
  name: "NewTrailView",
  components: { MapComponent },
  data() {
    return {
      newTrail: {
        profileId: 0,
        trailName: "",
        trailDescription: "",
        trailLength: 0,
        startName: "Start Point",
        startLatitude: 0,
        startLongitude: 0,
        locationStopDtos: []
      }
    };
  },

  created() {
    this.newTrail.profileId = sessionStorage.getItem('profileId');
  },
  methods: {
    handleMarkerPlaced(markerData) {
      if (this.newTrail.startLatitude === 0 && this.newTrail.startLongitude === 0) {
        // Setting the startname
        this.newTrail.startLatitude = markerData.lat;
        this.newTrail.startLongitude = markerData.lng;
      } else {
        // Setting the locationStopDtos
        this.newTrail.locationStopDtos.push({
          latitude: markerData.lat,
          longitude: markerData.lng,
          sequence: this.newTrail.locationStopDtos.length + 1
        });
      }
    },
    goHome() {
      // Сброс данных формы
      this.resetTrailData();

      // Перенаправление на главную страницу
      this.$router.push('/');
    },

    resetTrailData() {
      this.newTrail.startName = "Start Point";
      this.newTrail.startLatitude = 0;
      this.newTrail.startLongitude = 0;
      this.newTrail.locationStopDtos = [];
    },
    submitTrail() {
      console.log("Submitting trail with data:", this.newTrail);
      TrailService.sendPostTrailRequest(this.newTrail)
          .then(response => {
            console.log('Response from server:', response);
            alert('Trail successfully added!');
            NavigationService.navigateToNewTrailDetailsView()
          })
          .catch(error => {
            console.error('There was an error!', error.response ? error.response.data : error);
            alert('Failed to add trail.');
          });
    }

  }
}
</script>
