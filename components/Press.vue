<template>
  <Grid id="press" :classes="`grid grid4 gridStart`" :data="posts" />
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
  props: ["sort"],
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

      if (this.sort === `alpha`) {
        return axios
          .get(`${process.env.API}/wp-json/wp/v2/press?orderby=title&order=asc`)
          .then(res => {
            this.posts = res.data;
          });
      } else if (this.sort === `chrono`) {
        return axios
          .get(`${process.env.API}/wp-json/wp/v2/press?orderby=date&order=desc`)
          .then(res => {
            this.posts = res.data;
          });
      }
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>
