<template>
  <div id="umaylike">
    <h4 class="t-cat">You may also like</h4>
    <Grid :class="`grid${posts.length}`" :data="posts" />
  </div>
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
  components: {
    Grid
  },
  props: ["data"],
  data() {
    return {
      posts: [],
      url: ""
    };
  },
  methods: {
    getPosts(url) {
      const posts = axios
        .get(
          `${url}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=journal&_embed=1&per_page=3&categories=${this.data}`
        )
        .then(res => {
          this.posts = res.data;
        });
    }
  },
  mounted() {
    this.url = process.env.API;
    this.getPosts(this.url);
  }
};
</script>

<style lang="scss" scoped>
#umaylike {
  margin: 96px 12.9%;
  padding: 0 10%;
  text-align: center;

  h4 {
    margin-bottom: 24px;
  }
}
</style>


