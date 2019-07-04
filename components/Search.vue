<template>
  <div class="wrap" id="search">
    <section>
      <div class="h2 search-head">
        <span>Search for</span>
        <input
          ref="search-field"
          type="text"
          class="search-field h2"
          v-model.lazy="searchQuery"
          v-on:change="loadPosts"
        />

        <p
          :class="`result no-result ${resultLength > 0 ? `hidden` : ``}`"
          v-if="resultLength === 0"
        >
          {{feedbackMsg}}
          <span class="emoji">:(</span>
        </p>
        <p class="result" v-if="resultLength > 0">{{feedbackMsg}}</p>
      </div>

      <Grid class="grid3 grid-sm" :data="results" type="search" v-if="resultLength > 0" />
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
          name: "Posts",
          on: true,
          url: `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=journal&type[]press&_embed=1`,
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
      feedbackMsg: "",
      resultLength: 0
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

      if (this.$refs["search-field"].value.length >= 0) {
        this.sources.forEach((source, index) => {
          if (source.on) {
            var searchUrl = this.generateUrl(source);
            this.$axios.get(searchUrl).then(res => {
              res.data.map((k, i) => {
                bigArray.push(k);
              });

              if (bigArray.length > 0) {
                this.results = bigArray;
                this.feedbackMsg =
                  bigArray.length === 1
                    ? `${bigArray.length} result`
                    : `${bigArray.length} results`;
                this.nothing = false;
              } else {
                this.feedbackMsg = `No Results found`;
                this.nothing = true;
              }

              this.resultLength = bigArray.length;
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
#search {
  .h1 {
    width: 100%;
    display: flex;
  }

  .result {
    font-size: 21px;
    line-height: 1.71;
    letter-spacing: 1.81px;
  }

  .no-result {
    color: #ff0000;
    font-weight: normal;
    margin: 72px auto 12px;
  }

  .emoji {
    font-size: 121px;
    color: #d8d8d8;
    display: block;
  }
}

.search-head {
  text-align: center;
  margin-bottom: 70px;
}

.search-field {
  border: 0;
  border-bottom: 5px solid $pureblack;
  appearance: none;
  outline: none;

  margin-left: 0px;
}
</style>
