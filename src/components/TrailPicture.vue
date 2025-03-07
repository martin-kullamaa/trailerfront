<template>
  <div>
    <!-- Use a condition to check if PictureData is empty -->
    <img v-if="!pictureData || pictureData.trim() === ''"
         src="https://placehold.co/200"
         class="img-thumbnail"
         alt="placeholder image">
    <img v-else
         :src="pictureData"
         class="img-thumbnail fixed-size"
         alt="selected image">
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
  }
}
</script>
