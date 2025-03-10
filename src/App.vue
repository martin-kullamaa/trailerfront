<template>
  <AboutModal :modal-is-open="modalIsOpen" @event-close-modal="closeModal" />

  <div class="app-content">
    <nav>
      <!-- "About" nupp, mis avab modaali -->
      <button @click="openAboutModal" class="nav-button">About</button> |
      <router-link to="/">Map</router-link> |


      <template v-if="isLoggedIn">
        <router-link to="/newtrail">Add New Trail</router-link> |
        <button type="button" class="btn btn-success">Log out</button>
      </template>

      <template v-else>
        <router-link to="/login">Log in</router-link>
      </template>

      <router-view @event-update-nav-menu="updateNavMenu"/>
    </nav>

  </div>
</template>

<script>
import { onMounted } from 'vue';
import backgroundImage from '@/assets/background.jpg';
import AboutModal from "@/components/modal/AboutModal.vue";

export default {
  name: "App",
  components: { AboutModal },
  data() {
    return {
      modalIsOpen: false,
      isLoggedIn: false
    };
  },
  methods: {
    openAboutModal() {
      this.modalIsOpen = true;
    },
    closeModal() {
      this.modalIsOpen = false;
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