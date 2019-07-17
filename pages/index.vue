<template>
  <div>
    <Carousel
      :perPage="1"
      :autoplay="true"
      :autoplay-timeout="5000"
      :loop="true"
      :paginationEnabled="false"
      :navigationEnabled="true"
    >
      <Slide v-for="(i, k) in postsArray.slice(0,3)" :key="k">
        <Hero v-if="i" :data="i.post" type="home" />
      </Slide>
    </Carousel>

    <div v-html="page.content.rendered" class="t-wrap t-big-serif" data-aos="fade-up" />

    <Favorites :favs="page.acf.favorite_articles" />

    <Highlights
      :query="`/wp-json/wp/v2/${page.acf.highlight_article.post_type}?include=${page.acf.highlight_article.ID}&_embed=1`"
    />

    <div class="wall" v-if="posts">
      <div v-for="(i, k) in posts" :key="k">
        <div>
          <nuxt-link :to="`/${i.type}/${i.slug}`">
            <img v-lazy="i._embedded['wp:featuredmedia'][0].source_url" data-aos="fade-up" />
            <p class="t-cat" v-if="i.type === `projects`" data-aos="fade-up">Comissioned Projects</p>
            <p
              class="t-cat"
              v-else-if="i.type !==`projects` && i._embedded['wp:term']"
              data-aos="fade-up"
            >{{i._embedded["wp:term"][0][0].name}}</p>
            <p class="t-cat" v-else data-aos="fade-up">{{i.type}}</p>
            <p class="wall-title" data-aos="fade-up">{{i.title.rendered}}</p>
            <div v-if="i.excerpt" class="t-excerpt" v-html="i.excerpt.rendered" data-aos="fade-up" />
            <span class="arrow" data-aos="fade-up">
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
import Favorites from "~/components/Favorites";
import Highlights from "~/components/Highlights";

export default {
  components: {
    Carousel,
    Slide,
    Hero,
    Grid,
    Favorites,
    Highlights
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

    let postsArray = [];

    let all = $axios
      .get(
        `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=journal&per_page=100&_embed=1`
      )
      .then(res => {
        const d = res.data;
        d.map((i, k) => {
          postsArray.push({
            title: i.title.rendered,
            date: i.date.toString(),
            post: i
          });
        });
      })
      .then(() => {
        return postsArray;
      });

    return { page, postsArray };
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
.VueCarousel {
  position: relative;
  &::before {
    content: "";
    height: 90vh;
    width: 100vw;
    background: white;
  }

  &-wrapper {
    position: absolute;
  }
}
.VueCarousel-navigation {
  position: absolute;
  z-index: 999;
  top: 50%;
  width: calc(100% - 60px);
  left: 30px;
  height: 80px;
  transform: translateY(-50%);

  @media (max-width: $tabletDown) {
    /* display: none; */
    left: 4.5%;
    width: 91%;
  }

  > button {
    outline: none !important;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    background-color: $pureblack !important;
    color: $purewhite !important;
    transition: 0.1s ease;

    &::after {
      top: -1px;
      position: relative;
    }

    &:hover {
      background-color: $purewhite !important;
      color: $pureblack !important;

      &::after {
        filter: invert(1);
      }
    }
  }

  &-prev {
    transform: translateY(-50%) !important;
    font-size: 0;

    &::after {
      content: "";
      background: url("../assets/img/arrow-r.svg");
      display: inline-block;
      width: 21px;
      height: 20px;
      left: -1px;
    }
  }

  &-next {
    transform: translateY(-50%) !important;
    font-size: 0;

    &::after {
      content: "";
      background: url("../assets/img/arrow-l.svg");
      display: inline-block;
      width: 17px;
      height: 20px;
    }
  }
}

.favorites {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 62px auto;
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
    font-weight: 400;
    letter-spacing: 0.8px;
    margin: 8px 0px 10px 0px;
    line-height: 30px;
  }

  p {
    margin: 6px auto;
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
      margin-top: 16px;
    }

    .arrow {
      display: inline-block;
      /* margin-top: 24px; */
      transition: all 0.5s;
      transform-origin: left center;
    }

    &:hover {
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
        letter-spacing: -0.15px;
        /* margin: 15px 0 !important; */
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

