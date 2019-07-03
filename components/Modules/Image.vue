<template>
  <div>
    <img :src="url+image.url" :title="image.title" />
  </div>
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
