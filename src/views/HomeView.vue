<template>

  <div class="d-flex justify-content-center">
    <MapComponent
        :markers="locationStarts"
        :width="'80%'"
        :height="'720px'"
        :center="[58.5983, 25.0136]"
        :zoom="8"
        :types="types"
        @filter-selected="filterByType"
    />
    <button>jhgjhg</button>
  </div>

</template>

<script>
import LocationService from "@/service/LocationService";
import MapComponent from "@/components/MapComponent.vue";
import NavigationService from "@/service/NavigationService";
import TypeService from "@/service/TypeService";

export default {
  name: "HomeView",
  components: {MapComponent},
  data() {
    return {
      profileId: 0,
      locationStarts: [{
        locationId: 0,
        name: '',
        latitude: 0,
        longitude: 0
      }],
      types: {
        typeId: 0,
        name: ''
      }
    }
  },
  methods: {

    filterByType(typeId) {
      console.log("Selected typeId:", typeId);

      LocationService.sendFilteredLocationRequest(typeId)
          .then(response => {
            this.locationStarts = response.data; // Uuendab asukohtade loendi
            console.log("Filtered markers:", this.locationStarts); // Logi uus asukohtade loend
            // Siin saad uuendada ka kaarti markerite järgi
          })
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)

      // todo:edasta MapComponentile uus startLocation array

    },

    getTypes() {
      TypeService.sendGetTypesRequest()
          .then(response => this.types = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    sendLocationStartsRequest() {
      LocationService.sendLocationStartsRequest()
          .then(response => this.locationStarts = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    navigateToNewTrailView() {
      NavigationService.navigateToNewTrailView()
    },

    setProfileId() {
      this.profileId = parseInt(sessionStorage.getItem('profileId'), 10) || 0
    }

  },
  beforeMount() {
    this.sendLocationStartsRequest()
    this.setProfileId()
    this.getTypes()
  }
}
</script>