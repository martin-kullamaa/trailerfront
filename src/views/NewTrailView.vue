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

          <div class="input-group mb-3">
            <label for="length" class="form-label text-start d-block">1</label>
            <input type="text" class="form-control" id="length" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            <span class="input-group-text" id="basic-addon1">km</span>
          </div>

        </div>
        <div class="col">
          Column
        </div>
      </div>
    </div>
  </div>

</template>



<script>
export default {
  name: "NewTrailView",
  methods: {
    addNewTrail() {

    }
  }
}
</script>