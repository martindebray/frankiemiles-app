<template>
  <div class="logos">
    <div v-for="item in gallery">
      <!-- {{gallery}} -->
      <img :src="url+item.url" :title="item.title" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { gallery } = this.data;

    return {
      gallery,
      url: ""
    };
  },
  mounted() {
    this.url = process.env.API;
  }
};
</script>

<style lang="scss" scoped>
.logos {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 72px 48px;
  justify-items: center;
  align-items: center;

  img {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
