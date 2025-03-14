<template>
  <Modal
      :modal-is-open="modalIsOpen"
      :class="{ 'is-fullscreen': fullScreen }"
      @event-close-modal="closeModal"
  >
    <template #body>
      <div class="modal-container" :class="{ 'is-fullscreen': fullScreen }">
        <div class="modal-content" :class="{ 'is-fullscreen': fullScreen }">
          <div class="modal-body">
            <img
                :src="pic.data"
                alt="Pilt"
                class="img-fluid"
                style="max-width: 100%; max-height: 100vh; object-fit: contain;"
            />
          </div>
          <div class="modal-footer">
            <slot name="footer">{{ pic.name }}</slot>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'TrailViewPictureModal',
  components: { Modal },
  props: {
    modalIsOpen: {
      type: Boolean,
      required: true
    },
    fullScreen: { // Uus prop fullscreen jaoks
      type: Boolean,
      default: false
    },
    pic: {
      type: Object,
      required: true
    }
  }
}
</script>