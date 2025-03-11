<template>
  <AboutModal :modal-is-open="aboutModalIsOpen" @event-close-modal="closeAboutModal" />
  <LogOutModal :modal-is-open="logOutModalIsOpen"
               @event-close-modal="closeLogOutModal"
               @event-execute-log-out="executeLogOut"
  />

  <div class="app-content">
    <nav>
      <!-- "About" nupp, mis avab modaali -->
      <button @click="openAboutModal" class="nav-button">About</button> |
      <router-link to="/">Map</router-link> |


      <template v-if="isLoggedIn">
        <router-link to="/trail">Add New Trail</router-link> |
        <button @click="openLogOutModal" class="nav-button">Log out</button>
      </template>

      <template v-else>
        <router-link to="/login">Log in</router-link>
      </template>

    </nav>

    <router-view @event-update-nav-menu="updateNavMenu"/>

  </div>
</template>

<script>
import { ref } from 'vue';
import backgroundImage from '@/assets/background.jpg';
import AboutModal from "@/components/modal/AboutModal.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";
import NavigationService from "@/service/NavigationService";

export default {
  name: "App",
  components: { AboutModal, LogOutModal },

  data() {
    return {
      aboutModalIsOpen: false,
      logOutModalIsOpen: false,
      isLoggedIn: false
    };
  },
  methods: {
    openAboutModal() {
      this.aboutModalIsOpen = true;
    },
    closeAboutModal() {
      this.aboutModalIsOpen = false;
    },

    openLogOutModal() {
      this.logOutModalIsOpen = true;
    },
    closeLogOutModal() {
      this.logOutModalIsOpen = false;
    },

    executeLogOut() {
      sessionStorage.clear();
      this.updateNavMenu();
      NavigationService.navigateToHomeView();
      this.isLoggedIn = false;
      this.closeLogOutModal();
    },

    updateNavMenu() {
      let profileId = sessionStorage.getItem('profileId');
      this.isLoggedIn = profileId !== null;
    }
  },
  mounted() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundColor = 'black';
  },
  watch: {
    $route() {
      this.updateNavMenu();
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.app-content {
  position: relative;
  z-index: 1;
  color: white;
  font-size: 2rem;
}
</style>