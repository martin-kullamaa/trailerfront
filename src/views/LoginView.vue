<template>
  <div>
    <div class="container text-center mt-5">
      <div class="row justify-content-center">

        <div class="col col-3">
          <div class="input-group mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="Username" :class="{'is-invalid': showErrors && !username}">
          </div>
          <div class="input-group mb-3">
            <input v-model="password" type="text" class="form-control" placeholder="Password" :class="{'is-invalid': showErrors && !password}">
          </div>
          <div class="mb-3">
            <button @click="login" type="submit" class="btn btn-success mt-2 w-50">Log in</button>
          </div>
          <div>
            <button @click="navigateToRegisterView" type="button" class="btn btn-success mt-2 w-50">Register</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/service/LoginService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'LoginView',
  data() {
    return {
      showErrors: false,
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
      this.showErrors = true;
      if (this.username.length > 0 && this.password.length > 0) {
        this.sendLoginRequest();
      }
    },


    updateSessionStorageWithProfileDetails() {
      sessionStorage.setItem('profileId', this.loginResponse.profileId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
      // this.setSessionStorageProfile();
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data;
      this.updateSessionStorageWithProfileDetails();
      this.$emit('event-update-nav-menu')
      NavigationService.navigateToHomeView();
    },

    navigateToRegisterView(){
      NavigationService.navigateToRegisterView()
    },
  }
}
</script>