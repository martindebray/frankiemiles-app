<template>
  <div>
    <Grid id="journal" class="grid3 grid-sm" :data="posts" />
    <div :class="`cta ${moreToLoad ? `show` : `hidden`}`" @click="loadMore">
      <a>Load more</a>
    </div>
  </div>
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
      posts: [],
      loaded: 6,
      _length: 0,
      moreToLoad: false
    };
  },
  methods: {
    getLength() {
      return axios.get(`${process.env.API}/wp-json/wp/v2/journal`).then(res => {
        this._length = res.data.length;

        if (this.loaded >= this._length) {
          this.moreToLoad = false;
        } else {
          this.moreToLoad = true;
        }
      });
    },
    getPosts() {
      let data = null;

      return axios
        .get(
          `${process.env.API}/wp-json/wp/v2/journal?_embed=1&per_page=${this.loaded}`
        )
        .then(res => {
          this.posts = res.data;
        });
    },
    loadMore() {
      this.loaded = this.loaded + 6;

      this.getPosts();
      this.getLength();

      if (this.loaded >= this._length) {
        this.moreToLoad = false;
      }
    }
  },
  mounted() {
    this.getLength();
    this.getPosts();
  }
};
</script>
