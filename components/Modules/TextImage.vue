<template>
  <div class="text_image">
    <div v-html="text" />
    <div>
      <img :src="url+image.url" :title="image.title" />
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
      image,
      url: ""
    };
  },
  mounted() {
    this.url = process.env.API;
  }
};
</script>

<style lang="scss">
.text_image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: $tabletDown) {
    grid-template-columns: 1fr;
    grid-gap: 48px;
  }
}
</style>

