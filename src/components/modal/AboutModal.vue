<template>
  <Modal :modalIsOpen="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')">

    <template #title>About</template>

    <template #body>
      About modali sisu
    </template>

    <template #footer>
      <button @click="$emit('event-close-modal')" class="btn btn-outline-success">Close</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "aboutModal",
  components: { Modal },
  props: {
    modalIsOpen: Boolean
  }
};
</script>
