<template>
  <AboutModal/>
  <div class="app-content">
    <nav>
      <router-link to="/">About</router-link> |
      <router-link to="/">Map</router-link> |
      <router-link to="/login">Log in</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import backgroundImage from '@/assets/background.jpg';
import Modal from "@/components/modal/Modal.vue";
import AboutModal from "@/components/modal/AboutModal.vue";

onMounted(() => {
  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.style.backgroundSize = '100% 100%'; /* Venitab täpselt servadeni */
  document.body.style.backgroundRepeat = 'no-repeat'; /* Väldib kordamist */
  document.body.style.backgroundPosition = 'center'; /* Joondab keskele */
  document.body.style.backgroundColor = 'black'; /* Täidab ülejäänud ala musta värviga */
});
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