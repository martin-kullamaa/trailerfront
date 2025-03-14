<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="card transparent-card mb-3">
          <div class="container text-center">

            <div class="row">
              <h1>{{ trail.trailName }}</h1>
            </div>

            <div class="row">
              <h3>{{ trail.startName }}</h3>
            </div>
            <h6 class="mt-2 text-start">Description:</h6>
            <div class="row">
              <p class="text-start">{{ trail.trailDescription }}</p>
            </div>

          </div>
        </div>
        <div class="card transparent-card">
          <h6 class="mt-2">Added equipment:</h6>
          <div class="container text-center">
          <span v-for="trailEquipment in trailEquipment" :key="trailEquipment.equipmentId"
                @click="deleteTrailEquipment(trailEquipment.equipmentId)"
                class="badge text-bg-success custom-badge pointer me-3">
                {{ trailEquipment.name }}
          </span>
          </div>
          <div class="d-flex align-items-center justify-content-center flex-wrap py-2">
            <div class="mx-2">
              <span class="badge text-bg-success custom-badge">Type(s):</span>
            </div>
            <div v-for="trailType in trailTypes" :key="trailType.typeId" class="mx-2">
              <font-awesome-icon :icon="getTypeIcon(trailType.typeId)" class="main-icon small"/>
            </div>
            <div class="mx-2">
              <span class="badge text-bg-success custom-badge">Trail length: {{ trail.trailLength }}km</span>
            </div>
          </div>
        </div>

        <div>
          <button @click="goToEdit(startId)" class="btn btn-success mt-2 w-40 me-3">Edit</button>
        </div>

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
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card transparent-card mb-3">
          <div class="card-body">
            <h6 class="mt-2">Lisatud pildid:</h6>
            <div v-if="trailPictures.length > 0" class="mt-3">
              <div class="container">
                <div class="row">
                  <div v-for="(pic, index) in trailPictures" :key="index" class="col-4 mb-3">
                    <div class="d-flex flex-column align-items-center">
                      <img :src="pic.data" alt="picture" class="img-thumbnail"
                           style="width: 100px; height: 100px; object-fit: cover;">
                      <span class="mt-2 small">{{ pic.name }}</span>
                      <button @click="removePicture(index)" class="btn btn-sm btn-outline-danger mt-2">Eemalda</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import TrailService from "@/service/TrailService";
import MapComponent from "@/components/MapComponent.vue";
import PictureService from "@/service/PictureService";
import NavigationService from "@/service/NavigationService";

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
      },
      trailTypes: [{
        typeId: 0,
        name: ''
      }],
      trailEquipment: [{
        equipmentId: 0,
        name: ''
      }],
      trailPictures: [{
        data: '',
        name: ''
      }],
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

    getTrailTypes() {
      TrailService.sendGetTrailTypeRequest(this.trail.trailId)
          .then(response => this.trailTypes = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getTrailEquipment() {
      TrailService.sendGetTrailEquipmentRequest(this.trail.trailId)
          .then(response => this.trailEquipment = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getTrailPictures() {
      PictureService.sendGetPicturesRequest(this.trail.trailId)
          .then(response => this.trailPictures = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getTypeIcon(typeId) {
      const id = Number(typeId);
      switch (id) {
        case 1:
          return ['fas', 'person-hiking'];
        case 2:
          return ['fas', 'bicycle'];
        case 3:
          return ['fas', 'motorcycle'];
        default:
          return ['fas', 'question-circle'];
      }
    },
    goToEdit(startId) {
      this.$router.push({ name: 'EditTrail', params: { startId: startId } });
    }
  },
  beforeMount() {
    this.getTrail()
  },
  watch: {
    'trail.trailId'(newTrailId) {
      if (newTrailId && newTrailId !== 0) {
        this.getTrailTypes()
        this.getTrailEquipment()
        this.getTrailPictures()
      }
    }
  }
}
</script>