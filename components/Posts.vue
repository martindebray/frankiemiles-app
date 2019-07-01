<template>
  <Grid id="journal" :classes="`grid grid3 gridStart`" :data="posts"/>
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
  components: {
    Grid
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    getPosts() {
      let data = null;

      return axios
        .get(`${process.env.API}/wp-json/wp/v2/posts?_embed=1`)
        .then(res => {
          this.posts = res.data;
        });
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>

<style lang="scss">
#journal {
}
</style>
