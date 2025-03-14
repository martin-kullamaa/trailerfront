<template>
  <div>
    <div class="container text-center">
      <div class="row">
        <div class="col col-4">
          <div class="mb-3">
            <label for="trailName" class="form-label text-start d-block">Trail name</label>
            <input v-model="newTrail.trailName" type="text" class="form-control"
                   :class="{'is-invalid': showErrors && !newTrail.trailName}">
            <div class="invalid-feedback"></div>
          </div>
          <div class="mb-3">
            <label for="trailLength" class="form-label text-start d-block">Trail length</label>

            <div class="input-group mb-3" style="max-width: 150px;">
              <input v-model="newTrail.trailLength" :class="{'is-invalid': showErrors && !newTrail.trailLength}" type="text" class="form-control" aria-describedby="basic-addon2">
              <span class="input-group-text" id="basic-addon2">km</span>
            </div>
          </div>
          <div class="mb-3">
            <label for="trailDescription" class="form-label text-start d-block">Description</label>
            <textarea v-model="newTrail.trailDescription" class="form-control"
                      :class="{'is-invalid': showErrors && !newTrail.trailDescription}"
                      id="trailDescription" rows="12"></textarea>
            <div class="invalid-feedback"></div>
          </div>

          <button @click="goHome" class="btn btn-success mt-2 w-40 me-3">Back</button>
          <button @click="submitTrail" type="submit" class="btn btn-success mt-2 w-40">Continue</button>

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
      startId: this.$route.params.startId,
      showErrors: false,
      errorMessage: "",
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

    if (this.startId) {
      this.loadTrail();
    }
  },
  methods: {


    // Loading created trail data for editing
    loadTrail() {
      TrailService.sendGetTrailRequest(this.startId)
          .then(response => this.newTrail = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

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
      this.resetTrailData();
      NavigationService.navigateToHomeView()
    },

    resetTrailData() {
      this.newTrail.startName = "Start Point";
      this.newTrail.startLatitude = 0;
      this.newTrail.startLongitude = 0;
      this.newTrail.locationStopDtos = [];
    },
    submitTrail() {
      this.showErrors = true;
      this.errorMessage = "";

      // Kontrollime, kas kõik vajalikud väljad on täidetud
      if (!this.newTrail.trailName || !this.newTrail.trailLength || !this.newTrail.trailDescription ||
          this.newTrail.startLatitude === 0 || this.newTrail.startLongitude === 0) {
        this.errorMessage = "Palun täida kõik kohustuslikud väljad!";
        return; // Lõpetab funktsiooni täitmise, kui väljad pole täidetud
      }

      TrailService.sendPostTrailRequest(this.newTrail)
          .then(response => {
            const newTrailId = response.data;
            alert('Trail successfully added!');
            NavigationService.navigateToNewTrailDetailsView(newTrailId);
          })
          .catch(error => {
            console.error('There was an error!', error.response ? error.response.data : error);
            alert('Failed to add trail.');
          });
    }


  }
}
</script>
