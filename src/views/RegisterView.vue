<template>
  <div>
    <div class="container text-center">

      <div class="row justify-content-center">
        <div class="col">
          <h1>Uue konto registreerimine</h1>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-3">
          <div class="input-group mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="Username">
          </div>
          <div class="input-group mb-3">
            <input v-model="password" type="text" class="form-control" placeholder="Password">
          </div>
          <div class="input-group mb-3">
            <input v-model="password again" type="text" class="form-control" placeholder="Password">
          </div>
          <div class="input-group mb-3">
            <input v-model="email" type="text" class="form-control" placeholder="Password">
          </div>
        </div>


      </div>

    </div>
  </div>

</template>


<script>
export default {
  name: "RegisterView"
}
</script>



