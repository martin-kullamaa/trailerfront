<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
    <template #title>
      <div class="mt-2">Do you want to log out?</div>
    </template>


    <template #footer>
      <button @click="executeLogOut" class="btn btn-success mt-2 w-40">Log Out</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'LogOutModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  },
  methods: {
    executeLogOut() {
      this.$emit('event-execute-log-out')
    },
  }
}
</script>
