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
            <input v-model="newProfile.username" type="text" class="form-control" placeholder="Username">
          </div>
          <div class="input-group mb-3">
            <input v-model="newProfile.password" type="text" class="form-control" placeholder="Password">
          </div>
          <div class="input-group mb-3">
            <input v-model="passwordRetype" type="text" class="form-control" placeholder="Password again">
          </div>
          <div class="input-group mb-3">
            <input v-model="newProfile.email" type="text" class="form-control" placeholder="Email">
          </div>

            <button @click="addNewProfile" type="submit" class="btn btn-info">Create Account</button>

        </div>


      </div>

    </div>
  </div>

</template>


<script>
import ProfileService from "@/service/ProfileService";
import NavigationService from "@/service/NavigationService";

export default {
  name: "RegisterView",
  data() {
    return {
      passwordRetype: '',
      newProfile: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {


    addNewProfile() {
      ProfileService.sentPostNewProfile(this.newProfile)
          .then(response => NavigationService.navigateToHomeView())
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

  }
}
</script>



