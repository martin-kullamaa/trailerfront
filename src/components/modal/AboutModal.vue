<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')">

    <template #body>
      <img src="../../assets/LOGO.png" height="110" width="110" class="circular-logo mb-5"/>
      <p>This is a hiking and adventure planning website for travel enthusiasts and explorers. The trails available here can be completed on foot, by bicycle, or by motorcycle. You can add and share your own trips or find inspiration for your next adventure. Click on the starting points on the map to explore hikes, or log in to add your completed routes with detailed descriptions.</p>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'AboutModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  },
  methods:{

  }
}
</script>

