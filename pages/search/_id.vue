<template>
  <Search :query="query" :load="true"/>
</template>

<script>
import { capitalize } from "~/utils/capitalize";
import Search from "~/components/Search";

export default {
  components: {
    Search
  },
  data() {
    return {
      query: $nuxt.$route.params.id.replace(/[+]/g, " ")
    };
  },
  head() {
    return {
      title: `${capitalize(this.query)} – Search – Frankie Miles`
    };
  }
};
</script>

