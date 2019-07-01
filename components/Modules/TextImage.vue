<template>
  <div class="text_image">
    <div v-html="text"/>
    <div>
      <img :src="image.url" :title="image.title">
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { text, image } = this.data;

    return {
      text,
      image
    };
  }
};
</script>

<style lang="scss">
.text_image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
</style>

