<template>
  <div v-if="modalIsOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            <slot name="title"></slot>
          </h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer mt-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ modalIsOpen: Boolean });
const emit = defineEmits(["event-close-modal"]);

const closeModal = () => {
  emit("event-close-modal");
};
</script>
