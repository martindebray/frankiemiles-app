<template>
  <div class="imgImg">
    <figure>
      <img :src="url+image.url" :title="image.title" />
      <figcaption v-if="image.caption">{{image.caption}}</figcaption>
    </figure>
    <figure>
      <img :src="url+image_two.url" :title="image_two.title" />
      <figcaption v-if="image_two.caption">{{image_two.caption}}</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { image, image_two } = this.data;

    return {
      image,
      image_two,
      url: ""
    };
  },
  mounted() {
    this.url = process.env.API;
  }
};
</script>

<style lang="scss">
.imgImg {
  display: flex;
  align-items: flex-start;
  margin: 0 auto;
  width: 46%;

  figure {
    width: 46% !important;
    margin: 0 1% !important;
  }
}
</style>

