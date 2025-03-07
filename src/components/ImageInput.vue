<template>
  <div class="mb-3">
    <input type="file" id="fileInput" @change="handleImage" accept="image/x-png,image/jpeg,image/gif" style="display: none;">
    <label for="fileInput" class="btn btn-secondary btn-sm w-50">Choose Image</label>
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  data() {
    return {
      imageDataBase64: ''
    }
  },
  methods: {

    handleImage(event) {
      console.log("olen siin")
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataBase64 = reader.result;
        this.$emit('event-new-picture-selected', this.imageDataBase64)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    }
  }
}
</script>