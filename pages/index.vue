<template>
  <div>
    <Carousel
      :perPage="1"
      :autoplay="true"
      :autoplay-timeout="5000"
      :loop="true"
      :paginationEnabled="false"
    >
      <Slide v-for="(i, k) in finalArr.slice(0,3)" :key="k">
        <Hero v-if="i" :data="i.post" type="home" />
      </Slide>
    </Carousel>

    <div id="scroll">Scroll down</div>

    <div v-html="page.content.rendered" class="t-wrap t-big-serif" />

    <div class="favorites">
      <Grid class="grid3 grid-sm" :data="favs" />
    </div>

    <Hero v-if="hightligh" :data="hightligh" type="home" class="higlight" />

    <div class="wall" v-if="posts">
      <div v-for="(i, k) in posts">
        <div>
          <nuxt-link :to="`/${i.type}/${i.slug}`">
            <img :src="i._embedded['wp:featuredmedia'][0].source_url" />
            <p class="t-cat" v-if="i.type === `projects`">Comissioned Projects</p>
            <p
              class="t-cat"
              v-else-if="i.type !==`projects` && i._embedded['wp:term']"
            >{{i._embedded["wp:term"][0][0].name}}</p>
            <p class="t-cat" v-else>{{i.type}}</p>
            <p class="wall-title">{{i.title.rendered}}</p>
            <div v-if="i.excerpt" class="t-excerpt" v-html="i.excerpt.rendered" />
            <span class="arrow">
              <svg height="3" viewBox="0 0 17 3" width="17" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd" transform="translate(.0004 .008)">
                  <path d="m.4996 1.4963h13.7914" stroke="#464646" stroke-width=".6" />
                  <path d="m13.8525 2.992 2.591-1.496-2.591-1.496z" fill="#464646" />
                </g>
              </svg>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div :class="`cta ${moreToLoad ? `show` : `hidden`}`" @click="loadMore">
      <a>Load more</a>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import axios from "axios";

import Hero from "~/components/Hero";
import Grid from "~/components/Grid";

export default {
  components: {
    Carousel,
    Slide,
    Hero,
    Grid
  },
  data() {
    return {
      posts: [],
      loaded: 4,
      _length: 0,
      moreToLoad: false,
      url: ""
    };
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=home&_embed=1`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);

    let finalArr = [];

    let all = $axios
      .get(
        `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=journal&per_page=100&_embed=1`
      )
      .then(res => {
        const d = res.data;
        d.map((i, k) => {
          finalArr.push({
            title: i.title.rendered,
            date: i.date.toString(),
            post: i
          });
        });
      })
      .then(() => {
        return finalArr;
      });

    let hightligh = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${page.acf.highlight_article.post_type}?include=${page.acf.highlight_article.ID}&_embed=1`
    );
    typeof hightligh[0] !== `undefined`
      ? (hightligh = hightligh[0])
      : (hightligh = hightligh);

    let fav1 = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${page.acf.favorites_articles[0].article.post_type}?include=${page.acf.favorites_articles[0].article.ID}&_embed=1`
    );
    typeof fav1[0] !== `undefined` ? (fav1 = fav1[0]) : (fav1 = fav1);

    let fav2 = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${page.acf.favorites_articles[1].article.post_type}?include=${page.acf.favorites_articles[1].article.ID}&_embed=1`
    );
    typeof fav2[0] !== `undefined` ? (fav2 = fav2[0]) : (fav2 = fav2);

    let fav3 = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${page.acf.favorites_articles[2].article.post_type}?include=${page.acf.favorites_articles[2].article.ID}&_embed=1`
    );
    typeof fav3[0] !== `undefined` ? (fav3 = fav3[0]) : (fav3 = fav3);

    let favs = [];
    favs.push(fav1);
    favs.push(fav2);
    favs.push(fav3);

    return { page, hightligh, fav1, fav2, fav3, favs, finalArr };
  },
  methods: {
    getLength() {
      return axios
        .get(
          `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=journal&per_page=100`
        )
        .then(res => {
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
          `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=journal&_embed=1&per_page=${this.loaded}`
        )
        .then(res => {
          this.posts = res.data;
        });
    },
    loadMore() {
      this.loaded = this.loaded + 4;

      this.getPosts();
      this.getLength();

      if (this.loaded >= this._length) {
        this.moreToLoad = false;
      }
    }
  },
  head() {
    return {
      title: `${this.page.title.rendered} – Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: this.page.excerpt.rendered
        }
      ]
    };
  },
  mounted() {
    this.url = process.env.API;
    this.getLength();
    this.getPosts();

    const theme = this.page.acf.theme;
    if (theme === "White") {
      document.getElementById("header").setAttribute("data-theme", "white");
    } else {
      document.getElementById("header").setAttribute("data-theme", "dark");
    }
  }
};
</script>

<style lang="scss" scoped>
#scroll {
  text-align: center;
  padding: 14px 0;
}
.t-wrap {
  padding: 0 20%;
  margin: 62px auto 74px;

  @media (max-width: $tabletDown) {
    padding: 0 10%;
    margin: 24px auto 36px;
  }
}
</style>

<style lang="scss">
.favorites {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 48px auto;
  padding: 0 12.9%;

  @media (max-width: $tablet) {
    padding: 0 6.5%;
  }
}

.wall {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 7.8%;
  margin: 48px auto;

  .wall-title {
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
  }

  > div {
    width: calc(calc(100% / 2) - 12px);
    margin-top: 48px;
    text-align: left;

    &:nth-child(odd) {
      margin-right: 12px;
    }

    &:nth-child(even) {
      margin-left: 12px;
    }

    img {
      width: 100%;
      height: auto;
      transition: all 0.5s;
      transform-origin: bottom center;
    }

    .t-cat {
      margin-top: 28px;
    }

    .arrow {
      display: inline-block;
      /* margin-top: 24px; */
      transition: all 0.5s;
      transform-origin: left center;
    }

    &:hover {
      img {
        transform: translateY(-8px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
      }

      .arrow {
        transform: scaleX(2);
      }
    }
  }

  @media (max-width: $tablet) {
    padding: 0 4.5%;
  }

  @media (max-width: $tabletDown) {
    margin-top: 0;

    > div {
      width: 100%;
      margin-top: 32px;
      margin-right: 0 !important;
      margin-left: 0 !important;

      .t-cat {
        margin-top: 12px;
      }

      .wall-title {
        font-size: 18px;
        font-weight: 300;
        letter-spacing: -0.15px;
        margin: 15px 0;
      }

      .t-excerpt p {
        font-size: 12px;
        font-weight: 300;
        line-height: 1.67;
        margin-bottom: 0;
      }
    }
  }
}

.higlight {
  a {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.35);
      transition: 0.2s ease;
    }

    .metas {
      /* position: relative; */
      bottom: initial;
      left: initial;
      top: 7.4%;
      right: 5.6%;
      z-index: 1;
      text-align: right;
      max-width: 558px;
    }
  }

  &:hover {
    a {
      &::after {
        background: rgba(0, 0, 0, 0);
      }
    }
  }

  @media (max-width: $tabletDown) {
    a {
      .metas {
        /* position: relative; */
        bottom: initial;
        left: initial;
        top: 7.4%;
        right: 5.6%;
        left: 5.6%;
        z-index: 1;
        text-align: center;
        max-width: 558px;
      }
    }
  }
}
</style>

