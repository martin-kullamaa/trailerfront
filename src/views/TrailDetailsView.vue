<template>
  <div class="row justify-content-center">

    <div class="col-sm-3 mb-3">
      <div class="card transparent-card">
        <div class="card-body ">
          <TrailPicture :picture-data="currentPicture.data" @event-new-picture-selected="setPictureData"/>
          <!--          todo: add character limit to pic name-->
          <input v-model="currentPicture.name" type="text" class="form-control mt-2 w-50 mx-auto"
                 placeholder="Picture title"
                 :class="{'is-invalid': pictureError && !currentPicture.name.trim()}">
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
            <button class="btn btn-success dropdown-toggle w-50 m-2" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
              Add equipment
            </button>
            <font-awesome-icon
                @click="showEquipmentInput = true"
                icon="plus"
                class="position-absolute pointer"
                style="top: 50%; left: calc(50% + 110px); transform: translateY(-50%);"/>
            <ul class="dropdown-menu custom-dropdown w-50">
              <li v-for="currentEquipment in equipment" :key="currentEquipment.id">
                <a @click="addTrailEquipment(currentEquipment)" class="dropdown-item" href="#">{{
                    currentEquipment.name
                  }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-body">

          <div v-if="showEquipmentInput" class="d-flex align-items-center justify-content-center w-50 mx-auto">
            <input v-model="newEquipment" type="text" class="form-control"
                   placeholder="Equipment name"
                   :class="{'is-invalid': equipmentError && !newEquipment.trim()}">
            <button
                @click="addNewEquipment()"
                class="btn btn-success" type="button" aria-expanded="false">Add
            </button>
            <font-awesome-icon
                @click="showEquipmentInput = false"
                icon="angle-up"
                class="position-absolute pointer"
                style="top: 94%; left: calc(50% + 110px); transform: translateY(-50%);"/>
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
        <div class="container text-center">
          <span v-for="trailEquipment in trailEquipment" :key="trailEquipment.equipmentId"
                @click="deleteTrailEquipment(trailEquipment.equipmentId)"
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
      pictureError: false,
      equipmentError: false,
      showEquipmentInput: false,
      trailId: this.$route.params.trailId,
      trailPictures: [],
      currentPicture: {
        data: '',
        name: ''
      },
      newEquipment: '',
      equipment: [],
      trailEquipment: [],
      currentEquipment: {
        equipmentId: 0,
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
        this.pictureError = true;
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

    addNewEquipment() {
      if (!this.newEquipment.trim()) {
        this.equipmentError = true
        return
      }
      this.equipmentError = false

      EquipmentService.sendPostEquipmentRequest(this.newEquipment)
          .then(() => {
            this.getEquipment()
            this.newEquipment = ''
            this.showEquipmentInput = false;
          })
          .catch(error => {
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

    addTrailType(currentType) {
      const alreadyAdded = this.trailTypes.some(type => type.typeId === currentType.typeId)
      if (alreadyAdded) {
        return
      }

      TrailService.sendPostTrailTypeRequest(this.trailId, currentType.typeId)
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

    addTrailEquipment(currentEquipment) {
      const alreadyAdded = this.trailEquipment.some(equipment => equipment.equipmentId === currentEquipment.equipmentId)
      if (alreadyAdded) {
        return
      }
      this.currentEquipment = currentEquipment
      TrailService.sendPostTrailEquipmentRequest(this.trailId, this.currentEquipment.equipmentId)
          .then(() => this.getTrailEquipment(this.trailId))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    deleteTrailEquipment(equipmentId) {
      TrailService.sendDeleteTrailEquipmentRequest(this.trailId, equipmentId)
          .then(() => this.getTrailEquipment(this.trailId))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
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
