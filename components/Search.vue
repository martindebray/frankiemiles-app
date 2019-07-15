<template>
  <div class="wrap" id="search">
    <section>
      <div class="h2 search-head">
        <div>
          <span class="t-search">Search for</span>
          <form @submit="submitForm">
            <input
              ref="search-field"
              type="text"
              class="search-field h2"
              autofocus
              v-model.lazy="searchQuery"
              v-on:change="loadPosts"
              :placeholder="$nuxt._route.hash ? this.searchVal : ``"
            />
          </form>
        </div>
        <p
          :class="`result no-result ${resultLength > 0 ? `hidden` : ``}`"
          v-if="resultLength === 0"
        >
          {{feedbackMsg}}
          <span class="emoji" v-if="feedbackMsg.length > 0 && resultLength === 0">:(</span>
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
      searchQuery: this.query || $nuxt._route.hash.replace("#", ""),
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
      resultLength: 0,
      searchVal: ($nuxt._route.hash.replace("#", "") + "").replace(/%20/g, " ")
    };
  },
  filters: {
    prettyDate(value) {
      if (!value) return "";
      var date = moment.utc(value);
      return date.format("MMM DD, YYYY");
    }
  },
  watch: {
    $route(to, from) {
      this.show = false;
      setTimeout(() => {
        this.loadPosts("route");
      }, 10);
    }
  },
  methods: {
    submitForm() {
      this.searchVal = this.$refs["search-field"].value.replace(/%20/g, " ");

      window.location.hash = this.$refs["search-field"].value;
    },
    loadPosts(type) {
      let bigArray = [];
      let _url = type ? window.location.hash : this.$refs["search-field"].value;

      _url = _url.replace("#", "").replace(/%20/g, " ");

      if (_url.length > 0) {
        this.sources.forEach((source, index) => {
          if (source.on) {
            var searchUrl = this.generateUrl(source, _url);
            this.$refs["search-field"].value = _url;

            this.$axios.get(searchUrl).then(res => {
              res.data.map((k, i) => {
                bigArray.push(k);
              });

              if (bigArray.length > 0) {
                this.$refs["search-field"].value = _url;

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

              setTimeout(() => {
                this.$refs["search-field"].value = _url;
              }, 0);
            });
          }
        });
      } else if (_url.length === 0) {
        this.feedbackMsg = ``;
        this.nothing = false;
      } else {
        this.feedbackMsg = ``;
        this.nothing = true;
      }
    },
    generateUrl(source, _url) {
      if (_url && _url.length > 0) {
        return source.url + `&search=` + _url;
      } else {
        return source.url;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadPosts();

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
.h2,
h2 {
  font-size: 41px;

  @media (max-width: $tabletDown) {
    font-size: 24px;
  }
}

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

  > div {
    display: flex;
    justify-content: center;

    @media (max-width: $tabletDown) {
      display: initial;
    }
  }
}

.search-field {
  border: 0;
  appearance: none;
  outline: none;

  margin-left: 0px;
  padding-left: 12px;
  max-width: 300px;

  &:focus {
    ~ span {
      opacity: 0;
    }
  }

  @media (max-width: $tabletDown) {
    padding-top: 8px;
  }
}

.blinky {
  animation: 1s blink step-end infinite;
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
</style>
