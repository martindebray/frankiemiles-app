<template>
  <div class="imgImg">
    <img :src="url+image.url" :title="image.title" />
    <img :src="url+image_two.url" :title="image_two.title" />
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
  width: 46%;

  img {
    margin: 0 1%;
  }
}
</style>

