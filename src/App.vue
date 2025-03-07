<template>
  <AboutModal :modal-is-open="modalIsOpen" @event-close-modal="closeModal" />

  <div class="app-content">
    <nav>
      <!-- "About" nupp, mis avab modaali -->
      <button @click="openAboutModal" class="nav-button">About</button> |
      <router-link to="/">Map</router-link> |
      <router-link to="/login">Log in</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import backgroundImage from '@/assets/background.jpg';
import AboutModal from "@/components/modal/AboutModal.vue";

// Modaali avamise/sulgemise seisund
const modalIsOpen = ref(false);

const openAboutModal = () => {
  modalIsOpen.value = true;
};

const closeModal = () => {
  modalIsOpen.value = false;
};

onMounted(() => {
  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.style.backgroundSize = '100% 100%'; /* Venitab täpselt servadeni */
  document.body.style.backgroundRepeat = 'no-repeat'; /* Väldib kordamist */
  document.body.style.backgroundPosition = 'center'; /* Joondab keskele */
  document.body.style.backgroundColor = 'black'; /* Täidab ülejäänud ala musta värviga */
});
</script>
