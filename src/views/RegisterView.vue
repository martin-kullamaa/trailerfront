<template>
  <div class="container text-center mt-5">
    <div class="row justify-content-center">
      <div class="col col-3">
        <div class="input-group mb-3">
          <input v-model="newProfile.username" type="text" class="form-control" placeholder="Username"
                 :class="{'is-invalid': showErrors && !newProfile.username}">
        </div>
        <div class="input-group mb-3">
          <input v-model="newProfile.password" type="password" class="form-control" placeholder="Password"
                 :class="{'is-invalid': showErrors && !newProfile.password}">
        </div>
        <div class="input-group mb-3">
          <input v-model="passwordRetype" type="password" class="form-control" placeholder="Password again"
                 :class="{'is-invalid': showErrors && !passwordRetype || (passwordRetype !== newProfile.password)}">
        </div>
        <div class="input-group mb-3">
          <input v-model="newProfile.email" type="email" class="form-control" placeholder="Email"
                 :class="{'is-invalid': showErrors && !newProfile.email}">
        </div>

        <button @click="register" type="submit" class="btn btn-success mt-2 w-50">Create Account</button>
        <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileService from "@/service/ProfileService";
import LoginService from "@/service/LoginService"; // Impordime LoginService automaatseks sisselogimiseks
import NavigationService from "@/service/NavigationService";

export default {
  name: "RegisterView",
  data() {
    return {
      showErrors: false,
      errorMessage: "",
      passwordRetype: "",
      newProfile: {
        username: "",
        password: "",
        email: ""
      }
    };
  },
  methods: {
    register() {
      this.showErrors = true;
      this.errorMessage = "";

      if (!this.newProfile.username || !this.newProfile.password || !this.newProfile.email || !this.passwordRetype) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }

      if (this.newProfile.password !== this.passwordRetype) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      ProfileService.sentPostNewProfile(this.newProfile)
          .then(() => {
            setTimeout(() => {
              this.autoLogin();
            }, 500); // Ootame 500ms enne sisselogimise proovimist
          })
          .catch(error => {
            this.errorMessage = error.response?.data?.message || "Registration failed.";
          });
    },

    autoLogin() {
      // Logime uue kasutaja automaatselt sisse
      LoginService.sendLoginRequest(this.newProfile.username, this.newProfile.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => {
            this.errorMessage = "Account created, but login failed.";
          });
    },

    handleLoginResponse(response) {
      // Salvestame profiili andmed sessionStorage-i
      sessionStorage.setItem('profileId', response.data.profileId);
      sessionStorage.setItem('roleName', response.data.roleName);

      // Uuendame navigeerimismenüüd
      this.$emit('event-update-nav-menu');

      // Suuname kasutaja avalehele
      NavigationService.navigateToHomeView();
    }
  }
};
</script>
