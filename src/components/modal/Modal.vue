<template>
  <div>
    <div v-if="modalIsOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              <slot name="title"></slot>
            </h1>
            <button type="button" class="btn-close" @click="$emit('event-close-modal')" aria-label="Close"/>
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
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    modalIsOpen: Boolean,
    fullScreen: Boolean // Uus prop täisekraani modalite jaoks
  }
};
</script>
