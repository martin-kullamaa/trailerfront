<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')">

    <template #title>About</template>

    <template #body>
      <p>This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.This is the About modal content.</p>
    </template>

    <template #footer>
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

