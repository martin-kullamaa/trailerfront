<template>
  <div>
    <!-- Hidden file input -->
    <input
        type="file"
        ref="fileInput"
        @change="handleImage"
        accept="image/x-png,image/jpeg,image/gif"
        style="display: none;"
    />
    <img
        v-if="!pictureData || pictureData.trim() === ''"
        :src="placeholder"
        class="img-thumbnail fixed-size pointer"
        alt="Choose image"
        @click="chooseImage"
    />
    <img
        v-else
        :src="pictureData"
        class="img-thumbnail fixed-size"
        alt="Selected image"
        @click="chooseImage"
    />
  </div>
</template>

<script>
export default {
  name: 'TrailPicture',
  props: {
    pictureData: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      placeholder: "https://fakeimg.pl/200x200?text=Choose+image&font=noto&font_size=15"
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    handleImage(event) {
      const selectedImage = event.target.files[0];
      if (!selectedImage) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.$emit('event-new-picture-selected', reader.result);
      };
      reader.onerror = (error) => {
        alert("Error reading file: " + error);
      };
      reader.readAsDataURL(selectedImage);
    }
  }
}
</script>
