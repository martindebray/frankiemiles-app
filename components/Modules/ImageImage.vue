<template>
  <div>
    <img :src="image.url" :title="image.title" />
    <img :src="image_two.url" :title="image_two.title" />
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { image, image_two } = this.data;

    return {
      image,
      image_two
    };
  }
};
</script>
