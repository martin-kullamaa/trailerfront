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
import NavigationService from "@/service/NavigationService";

export default {
  name: "HomeView",
  components: {MapComponent},
  data() {
    return {
      profileId: 0,
      locationStarts: [{
        name: '',
        latitude: 0,
        longitude: 0
      }]
    }
  },
  methods: {

    // todo: MapComponent needs to emit what to filter by based on the dropdown items clicked
    // todo: HoveView needs to send axiosGet request with parameter typeId (swagger)

    sendLocationStartFilter() {
      axios.get('/location/type', {
            params: {
              typeId: this.someDataBlockVariable1,
              someRequestParam2: this.someDataBlockVariable2
            }
          }
      ).then(response => {
        this.someDataBlockResponseObject = response.data
      }).catch(error => {
        this.someDataBlockErrorResponseObject = error.response.data
      })
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
  }
}
</script>