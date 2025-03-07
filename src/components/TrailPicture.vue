<template>
  <div>
    <!-- Use a condition to check if PictureData is empty -->
    <img v-if="!PictureData || PictureData.trim() === ''"
         src="https://placehold.co/600x400"
         class="img-thumbnail"
         alt="placeholder image">
    <img v-else
         :src="PictureData"
         class="img-thumbnail"
         alt="selected image">
  </div>
</template>

<script>
export default {
  name: 'TrailPicture',
  props: {
    PictureData: {
      type: String,
      default: ''
    }
  }
}
</script>
