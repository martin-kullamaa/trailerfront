<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')">

    <template #title>About</template>

    <template #body>
      <img src="../../assets/LOGO.png" height="110" width="110"/>
      <p>This is a hiking and adventure planning website for travel enthusiasts and explorers. The trails available here can be completed on foot, by bicycle, or by motorcycle. You can add and share your own trips or find inspiration for your next adventure. Click on the starting points on the map to explore hikes, or log in to add your completed routes with detailed descriptions.</p>
    </template>

    <template #footer>
      <button type="button" class="btn btn-success mt-2 w-40" @click="$emit('event-close-modal')">Close</button>
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

