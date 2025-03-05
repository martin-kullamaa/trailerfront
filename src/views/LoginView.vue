<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">

        <div class="col col-3">
          <div class="input-group mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="Username">
          </div>
          <div class="input-group mb-3">
            <input v-model="password" type="text" class="form-control" placeholder="Password">
          </div>
          <div class="mb-3">
            <button @click="login" type="button" class="btn btn-info">Log in</button>
          </div>
          <div>
            <button @click="navigateToRegisterView" type="button" class="btn btn-info">Register</button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoginService from "@/service/LoginService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        profileId: 0,
        roleName: ''
      }
    }
  },
  methods: {
    login() {
      if (this.username.length > 0 && this.password.length > 0) {
        this.sendLoginRequest();
      }
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data;
      sessionStorage.setItem('profileId', this.loginResponse.profileId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
      // this.setSessionStorageProfile();
    },

    navigateToRegisterView(){
      NavigationService.navigateToRegisterView()
    },
  }
}
</script>