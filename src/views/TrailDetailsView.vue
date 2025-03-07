<template>
  <div class="row justify-content-center">

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div class="card transparent-card">
        <div class="card-body">
          <h5 class="card-title">Pictures</h5>
          <ImageInput @event-new-picture-selected="setPictureData"/>
          <TrailPicture :picture-data="trailPicture"/>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div class="col-sm-3">
      <div class="card transparent-card">
        <div class="card-body">
          <h5 class="card-title">Equipment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div class="col-sm-3">
      <div class="card transparent-card">
        <div class="card-body">
          <h5 class="card-title">Type</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ImageInput from "@/components/ImageInput.vue";
import TrailPicture from "@/components/TrailPicture.vue";

export default {
  name: "TrailDetailsView",
  components: {TrailPicture, ImageInput},
  data() {
    return {
      trailPicture: ''
    }
  },
  methods: {
    setPictureData(pictureData){
      this.trailPicture = pictureData
    }
  }
}
</script>

<style>
.card {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>