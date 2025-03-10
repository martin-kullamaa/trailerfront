<template>
  <div class="row justify-content-center">

    <div class="col-sm-3 mb-3">
      <div class="card transparent-card">
        <div class="card-body ">
          <TrailPicture :picture-data="currentPicture.data" @event-new-picture-selected="setPictureData"/>
          <!--          todo: add character limit to pic name-->
          <input v-model="currentPicture.name" type="text" class="form-control mt-2 w-50 mx-auto"
                 placeholder="Picture title"
                 :class="{'is-invalid': showErrors && !currentPicture.name.trim()}">
          <button type="button" class="btn btn-success mt-2 w-50" @click="addPicture">Add picture</button>
        </div>

        <div class="card-body ">
          <div class="dropdown">
            <button class="btn btn-success dropdown-toggle w-50" type="button" data-bs-toggle="dropdown">Add type
            </button>
            <ul class="dropdown-menu custom-dropdown w-50">
              <li v-for="currentType in types">
                <a @click="addTrailType(currentType)" class="dropdown-item" href="#">{{ currentType.name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-body">
          <div class="dropdown">
            <button class="btn btn-success dropdown-toggle w-50" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
              Add equipment
            </button>
            <ul class="dropdown-menu custom-dropdown w-50">
              <li v-for="currentEquipment in equipment" :key="currentEquipment.id">
                <a @click="addTrailEquipment(currentEquipment)" class="dropdown-item" href="#">{{ currentEquipment.name }}</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <div class="col-sm-3">
      <div class="card transparent-card mb-3">
        <h6 class="mt-2">Added picture(s):</h6>
        <div v-if="trailPictures.length > 0" class="mt-3">
          <div class="container">
            <div v-for="(pic, index) in trailPictures" :key="index"
                 class="d-flex align-items-center py-2 border-bottom">

              <img :src="pic.data" alt="picture" class="img-thumbnail"
                   style="width: 100px; height: 100px; object-fit: cover;">

              <span class="ms-3 flex-grow-1 small">{{ pic.name }}</span>

              <button @click="removePicture(index)" class="btn btn-sm btn-outline-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3">
      <div class="card transparent-card mb-3">
        <h6 class="mt-2">Added type(s):</h6>
        <div class="container text-center">
          <div class="row">
            <div v-for="trailType in trailTypes" :key="trailType.typeId" class="col">
              <div>
                <font-awesome-icon :icon="getTypeIcon(trailType.typeId)" class="main-icon"/>
                <font-awesome-icon @click="deleteTrailType(trailType.typeId)" icon="trash" class="trash-icon pointer"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card transparent-card">
        <h6 class="mt-2">Added equipment:</h6>
        <div class="card-body">
          <span v-for="trailEquipment in trailEquipment"
                class="badge text-bg-success custom-badge pointer me-3">
                {{ trailEquipment.name }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TrailPicture from "@/components/TrailPicture.vue";
import PictureService from "@/service/PictureService";
import EquipmentService from "@/service/EquipmentService";
import TypeService from "@/service/TypeService";
import TrailService from "@/service/TrailService";

export default {
  name: "TrailDetailsView",
  components: {TrailPicture},
  data() {
    return {
      showErrors: false,
      // todo: trailId needs to be emitted from NewTrailView
      // todo: also emit trailName here and incorporate it on the cards
      trailId: 1,
      trailPictures: [],
      currentPicture: {
        data: '',
        name: ''
      },
      equipment: [],
      trailEquipment: [],
      currentEquipment: {
        id: 0,
        name: ''
      },
      types: [],
      trailTypes: [],
      currentType: {
        typeId: 0,
        name: ''
      },
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
            this.currentPicture = {data: '', name: ''}
            this.showErrors = false
          })
          .catch(error => {
            console.error("Error saving picture:", error)
          });
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

    getEquipment() {
      EquipmentService.sendGetEquipmentRequest()
          .then(response => this.equipment = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getTypes() {
      TypeService.sendGetTypesRequest()
          .then(response => this.types = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getTrailTypes() {
      TrailService.sendGetTrailTypeRequest(this.trailId)
          .then(response => this.trailTypes = response.data)
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

    // todo: add error handling = can't choose type that's already chose
    addTrailType(currentType) {
      this.currentType = currentType
      TrailService.sendPostTrailTypeRequest(this.trailId, this.currentType.typeId)
          .then(() => this.getTrailTypes(this.trailId))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },


    deleteTrailType(typeId) {
      TrailService.sendDeleteTrailTypeRequest(this.trailId, typeId)
          .then(() => this.getTrailTypes(this.trailId))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getTrailEquipment() {
      TrailService.sendGetTrailEquipmentRequest(this.trailId)
          .then(response => this.trailEquipment = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    addTrailEquipment() {
      axios.post('/some/path', null, {
            params: {
              someRequestParam1: this.someDataBlockVariable1,
              someRequestParam2: this.someDataBlockVariable2
            }
          }
      ).then(response => {
        this.someDataBlockResponseObject = response.data
      }).catch(error => {
        this.someDataBlockErrorResponseObject = error.response.data
      })
    },
  },
  beforeMount() {
    this.getTrailPictures()
    this.getEquipment()
    this.getTypes()
    this.getTrailTypes()
    this.getTrailEquipment()
  }
}
</script>
