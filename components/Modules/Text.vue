<template>
  <div :class="wide.length > 0 ? `${acf_fc_layout} ${wide.toLowerCase()}` : ``">
    <div v-html="text" class="markup" />
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    const { text, wide, acf_fc_layout } = this.data;
    return {
      text,
      wide,
      acf_fc_layout
    };
  }
};
</script>

<style lang="scss" scoped>
.wide {
  padding: 0 5.2%;
  margin: 0 auto;
  font-weight: 900;
}

.narrow {
  padding: 0 25%;
  margin: 0 auto;

  @media (max-width: $tablet) {
    padding: 0 16%;
  }
}
</style>

<style lang="scss">
.markup {
  h3 {
    font-size: 28px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: 0.62px;
  }
}
</style>
