<template>
  <Grid id="press" :classes="`grid grid4 gridStart`" :data="posts"/>
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

      return axios.get(`${process.env.API}/wp-json/wp/v2/press`).then(res => {
        this.posts = res.data;
      });
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>

