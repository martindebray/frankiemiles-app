<template>
  <Grid :id="this.type" class="grid4 grid-md" :data="posts" />
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
  props: ["type", "sort"],
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
          .get(
            `${process.env.API}/wp-json/wp/v2/${this.type}?orderby=title&order=asc&_embed=1`
          )
          .then(res => {
            this.posts = res.data;
          });
      } else if (this.sort === `chrono`) {
        return axios
          .get(
            `${process.env.API}/wp-json/wp/v2/${this.type}?orderby=date&order=desc&_embed=1`
          )
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
