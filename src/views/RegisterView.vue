<template>
  <div>
    <div class="container text-center mt-5">


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

            <button @click="addNewProfile" type="submit" class="btn btn-success mt-2 w-50">Create Account</button>

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
          .then(NavigationService.navigateToHomeView())
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

  }
}
</script>



