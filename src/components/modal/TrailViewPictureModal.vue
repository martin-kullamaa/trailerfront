<template>
  <Modal :modal-is-open="modalIsOpen" :fullScreen="true" @event-close-modal="closeModal">
    <template #body>
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-body">
            <div class="image-wrapper">
              <img
                  :src="pic.data"
                  alt="Pilt"
                  class="img-fluid"
                  style="max-width: 100%; max-height: 90vh; object-fit: contain;"
              />
            </div>
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
    pic: {
      type: Object,
      required: true
    },
  }
}
</script>

<style scoped>
.modal-body {
  display: flex;
  justify-content: center; /* Horisontaalselt keskele */
  align-items: center; /* Vertikaalselt keskele */
  height: 80vh; /* Tagab, et keha täidab suure osa modali kõrgusest */
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
