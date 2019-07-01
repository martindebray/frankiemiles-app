<template>
  <div :class="wide.length > 0 ? `${acf_fc_layout} ${wide.toLowerCase()}` : ``">
    <div v-html="text" />
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
  font-weight: 900;
}

.short {
  max-width: 50%;
  margin: 0 auto;
}
</style>

