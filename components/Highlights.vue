<template>
  <Hero v-if="this.key > 0" :data="hightligh" type="home" class="higlight" :key="key" />
</template>

<script>
import axios from "axios";
import Hero from "~/components/Hero";

export default {
  props: ["query"],
  components: {
    Hero
  },
  data() {
    return {
      hightligh: [],
      key: 0
    };
  },
  async created() {
    const query = await axios.get(process.env.API + this.query);
    this.hightligh = query.data[0];
    this.key = this.key + 1;
  }
};
</script>

