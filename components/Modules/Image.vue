<template>
  <figure>
    <img :src="url+image.url" :title="image.title" />
    <figcaption>{{image.caption}}</figcaption>
  </figure>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { image } = this.data;

    return {
      image,
      url: ""
    };
  },
  mounted() {
    this.url = process.env.API;
  }
};
</script>
