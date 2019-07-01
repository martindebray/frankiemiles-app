<template>
  <div>
    <img :src="image.url" :title="image.title">
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { image } = this.data;

    return {
      image
    };
  }
};
</script>
