<template>
  <div class="row justify-content-center">

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div class="card transparent-card">
        <div class="card-body">
          <TrailPicture :picture-data="currentPicture.data" @event-new-picture-selected="setPictureData"/>
          <input v-model="currentPicture.name" type="text" class="form-control mt-2 w-50 mx-auto" placeholder="Picture title"
                 :class="{'is-invalid': showErrors && !currentPicture.name.trim()}">
          <button type="button" class="btn btn-info mt-2 w-50" @click="addPicture">Add picture</button>
          <div v-if="trailPictures.length > 0" class="mt-3">
            <div class="container">
              <h6>Added Pictures:</h6>
              <div v-for="(pic, index) in trailPictures" :key="index" class="d-flex align-items-center py-2 border-bottom">
                <!-- Small thumbnail -->
                <img :src="pic.data" alt="picture" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                <!-- Picture name -->
                <span class="ms-3 flex-grow-1 small">{{ pic.name }}</span>
                <!-- Remove button -->
                <button @click="removePicture(index)" class="btn btn-sm btn-outline-danger">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3">
      <div class="card transparent-card">
        <div class="card-body">
          <div class="dropdown">
            <button class="btn btn-secondary btn-info btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Choose equipment
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3">
      <div class="card transparent-card">
        <div class="card-body">
          <h5 class="card-title">Type</h5>
          <p class="card-text">SOMETHING</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TrailPicture from "@/components/TrailPicture.vue";
import PictureService from "@/service/PictureService";

export default {
  name: "TrailDetailsView",
  components: {TrailPicture},
  data() {
    return {
      showErrors: false,
      // todo: trailId needs to be emitted from NewTrailView
      trailId: 1,
      currentPicture: {
        data: '',
        name: ''
      },
      trailPictures: []
    }
  },
  methods: {

    setPictureData(pictureData) {
      this.currentPicture.data = pictureData;
    },

    addPicture() {
      if (!this.currentPicture.data || !this.currentPicture.name.trim()) {
        this.showErrors = true;
        return;
      }

      const pictureDto = {
        data: this.currentPicture.data,
        name: this.currentPicture.name
      }

      PictureService.sendPostPictureRequest(this.trailId, pictureDto)
          .then(() => {
            this.getTrailPictures()
            this.currentPicture = { data: '', name: '' }
            this.showErrors = false
          })
          .catch(error => {
            console.error("Error saving picture:", error)
          });
    },

    deletePicture() {
      axios.delete('/picture', {
            params: {
              trailId: this.trailId,
              someRequestParam2: this.someDataBlockVariable2
            }
          }
      ).then(response => {
        this.someDataBlockResponseObject = response.data
      }).catch(error => {
        this.someDataBlockErrorResponseObject = error.response.data
      })
    },

    removePicture(index) {
      const pic = this.trailPictures[index];
      PictureService.sendDeletePictureRequest(this.trailId, pic.name)
          .then(() => this.trailPictures.splice(index, 1))
          .catch(error => console.error("Error deleting picture:", error))
    },

    getTrailPictures() {
      PictureService.sendGetPicturesRequest(this.trailId)
          .then(response => this.trailPictures = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

  },
  beforeMount() {
    this.getTrailPictures()
  }
}
</script>
