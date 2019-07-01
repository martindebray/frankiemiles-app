<template>
  <Search :load="false"/>
</template>

<script>
import Search from "~/components/Search";

export default {
  components: {
    Search
  },
  head() {
    return {
      title: "Search – Frankie Miles"
    };
  }
};
</script>

