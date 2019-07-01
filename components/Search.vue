<template>
  <div class="wrap" id="app">
    <section class="cnotv__section">
      <h1 class="h1">Search</h1>
      <p class="p-big">Looking for something?</p>
      <input
        ref="search-field"
        type="text"
        class="search-field"
        placeholder="Try me"
        v-model.lazy="searchQuery"
        v-on:change="loadPosts"
      >
    </section>
    <br>

    <!-- <section>
      <div class="h1" v-show="searchQuery">You searched: {{searchQuery}}</div>
    </section>-->

    <section v-if="nothing">
      <p class="h1">{{feedbackMsg}}</p>
    </section>

    <section v-else>
      <Grid classes="grid grid3" :data="results" type="search"/>
    </section>
  </div>
</template>

<script>
import Grid from "~/components/Grid";

export default {
  props: ["query", "load"],
  components: {
    Grid
  },
  data() {
    return {
      searchQuery: this.query,
      sources: [
        {
          name: "Journal",
          on: true,
          url: `${process.env.API}/wp-json/wp/v2/posts?_embed=1`,
          posts: []
        },
        {
          name: "Press",
          on: true,
          url: `${process.env.API}/wp-json/wp/v2/press?_embed=1`,
          posts: []
        },
        {
          name: "Projects",
          on: true,
          url: `${process.env.API}/wp-json/wp/v2/projects?_embed=1`,
          posts: []
        },
        {
          name: "Pages",
          on: true,
          url: `${process.env.API}/wp-json/wp/v2/pages?_embed=1`,
          posts: []
        }
      ],
      results: [],
      nothing: true,
      feedbackMsg: ""
    };
  },
  filters: {
    prettyDate(value) {
      if (!value) return "";
      var date = moment.utc(value);
      return date.format("MMM DD, YYYY");
    }
  },
  methods: {
    loadPosts() {
      let bigArray = [];

      if (this.$refs["search-field"].value.length > 0) {
        this.sources.forEach((source, index) => {
          if (source.on) {
            var searchUrl = this.generateUrl(source);
            this.$axios.get(searchUrl).then(res => {
              res.data.map((k, i) => {
                bigArray.push(k);
              });

              if (bigArray.length > 0) {
                this.results = bigArray;
                this.nothing = false;
              } else {
                this.feedbackMsg = `no results :(`;
                this.nothing = true;
              }
            });
          }
        });
      } else {
        this.feedbackMsg = ``;
        this.nothing = true;
      }
    },
    generateUrl(source) {
      if (this.searchQuery && this.searchQuery.length > 0) {
        return source.url + `&search=` + encodeURI(this.searchQuery);
      } else {
        return source.url;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.load) {
        this.loadPosts();
      } else {
        this.nothing = true;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.search-field {
  border: 0;
  border-bottom: 5px solid $pureblack;
  appearance: none;
  outline: none;

  width: 100%;
  padding: 12px 0;
  margin: 48px 0;

  font-size: 68px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 1.5px;
}
</style>
