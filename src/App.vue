<template>
  <div class="app-content">
    <nav>
      <router-link to="/">Map</router-link> |
      <router-link to="/login">Log in</router-link>
    </nav>
    <router-view @event-update-nav-menu="updateNavMenu"/>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import backgroundImage from '@/assets/background.jpg';

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    updateNavMenu() {
      let profileId = sessionStorage.getItem('profileId');
      this.isLoggedIn = profileId !== null;
    }
  },
  mounted() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = '100% 100%'; // Venitab täpselt servadeni
    document.body.style.backgroundRepeat = 'no-repeat'; // Väldib kordamist
    document.body.style.backgroundPosition = 'center'; // Joondab keskele
    document.body.style.backgroundColor = 'black'; // Täidab ülejäänud ala musta värviga
  }
}
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