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

    <div v-html="page.content.rendered" class="t-wrap t-serif" />

    <div class="favorites">
      <div v-for="item in favs" class="g-item" v-animate="'r-slide-down'">
        <nuxt-link
          v-if="item.type === `post`"
          :to="`/journal/${item.slug}`"
          :class="` ${isLoaded ? 'loaded' : ''}`"
        >
          <lazy-component @show="handler">
            <img
              v-if="item.acf && item.acf.hero"
              :src="item.acf.hero.url"
              :title="item.acf.hero.title"
              v-rjs="2"
            />
          </lazy-component>
          <h4
            v-if="item._embedded && item._embedded['wp:term']"
          >{{item._embedded["wp:term"][0][0].name}}</h4>
          <h3 v-if="item.title">{{item.title.rendered}}</h3>
        </nuxt-link>
        <nuxt-link
          v-else
          :to="`/${item.type}/${item.slug}`"
          :class="` ${isLoaded ? 'loaded' : ''}`"
        >
          <lazy-component @show="handler">
            <img
              v-if="item.acf && item.acf.hero"
              :src="item.acf.hero.url"
              :title="item.acf.hero.title"
              v-rjs="2"
            />
          </lazy-component>
          <h4 v-if="item.type === `projects`">Comissioned Projects</h4>
          <h4 v-else>{{item.type}}</h4>
          <h3 v-if="item.title">{{item.title.rendered}}</h3>
        </nuxt-link>
      </div>
    </div>

    <Hero v-if="hightligh" :data="hightligh" type="home" class="higlight" />

    <div class="wall" v-if="posts">
      <div v-for="(i, k) in posts">
        <div>
          <nuxt-link v-if="i.type === `post`" :to="`/journal/${i.slug}`">
            <lazy-component @show="handler">
              <img :src="i.acf.hero.url" v-rjs="2" />
              <h3>{{i._embedded["wp:term"][0][0].name}}</h3>
              <h2>{{i.title.rendered}}</h2>
              <div v-if="i.excerpt" class="t-excerpt" v-html="i.excerpt.rendered" />
              <span class="arrow">
                <svg
                  width="17px"
                  height="3px"
                  viewBox="0 0 17 3"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Builder/Preview-Text--2" transform="translate(0.000000, -167.000000)">
                      <g id="Group-5">
                        <g id="Group" transform="translate(0.000400, 167.008000)">
                          <path
                            d="M0.4996,1.4963 L14.291,1.4963"
                            id="Stroke-1"
                            stroke="#464646"
                            stroke-width="0.6"
                          />
                          <polygon
                            id="Fill-3"
                            fill="#464646"
                            points="13.8525 2.992 16.4435 1.496 13.8525 -1.9095836e-14"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </lazy-component>
          </nuxt-link>
          <nuxt-link v-else :to="`/${i.type}/${i.slug}`">
            <lazy-component @show="handler">
              <img :src="i.acf.hero.url" v-rjs="2" />
              <h3 v-if="i.type === `projects`">Comissioned Projects</h3>
              <h3 v-else>Press</h3>
              <h2>{{i.title.rendered}}</h2>
              <div v-if="i.excerpt" class="t-excerpt" v-html="i.excerpt.rendered" />
              <span class="arrow">
                <svg
                  width="17px"
                  height="3px"
                  viewBox="0 0 17 3"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Builder/Preview-Text--2" transform="translate(0.000000, -167.000000)">
                      <g id="Group-5">
                        <g id="Group" transform="translate(0.000400, 167.008000)">
                          <path
                            d="M0.4996,1.4963 L14.291,1.4963"
                            id="Stroke-1"
                            stroke="#464646"
                            stroke-width="0.6"
                          />
                          <polygon
                            id="Fill-3"
                            fill="#464646"
                            points="13.8525 2.992 16.4435 1.496 13.8525 -1.9095836e-14"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </lazy-component>
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
import Categories from "~/components/Categories";
import Hero from "~/components/Hero";
import Posts from "~/components/Posts";
import Press from "~/components/Press";
import Projects from "~/components/Projects";
import Modules from "~/components/Modules/index";

import { Carousel, Slide } from "vue-carousel";
import axios from "axios";

export default {
  components: {
    Carousel,
    Slide,
    Categories,
    Hero,
    Posts,
    Press,
    Projects,
    Modules
  },
  data() {
    return {
      posts: [],
      loaded: 4,
      _length: 0,
      moreToLoad: false,
      num: 0,
      isLoaded: false,
      url: ""
    };
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=home&_embed=1`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);

    // console.log(page);

    let finalArr = [];

    // let posts = await $axios.$get(
    //   `${process.env.API}/wp-json/wp/v2/${
    //     page.acf.hero.post_type === "post" ? `posts` : page.acf.hero.post_type
    //   }?include=${page.acf.hero.ID}&_embed=1`
    // );

    let all = $axios
      .get(
        `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=press&type[]=projects&type[]=post&per_page=100&_embed=1`
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
      `${process.env.API}/wp-json/wp/v2/${
        page.acf.highlight_article.post_type === "post"
          ? `posts`
          : page.acf.highlight_article.post_type
      }?include=${page.acf.highlight_article.ID}&_embed=1`
    );
    typeof hightligh[0] !== `undefined`
      ? (hightligh = hightligh[0])
      : (hightligh = hightligh);

    let fav1 = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${
        page.acf.favorites_articles[0].article.post_type === "post"
          ? `posts`
          : page.acf.favorites_articles[0].article.post_type
      }?include=${page.acf.favorites_articles[0].article.ID}&_embed=1`
    );
    typeof fav1[0] !== `undefined` ? (fav1 = fav1[0]) : (fav1 = fav1);

    let fav2 = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${
        page.acf.favorites_articles[1].article.post_type === "post"
          ? `posts`
          : page.acf.favorites_articles[1].article.post_type
      }?include=${page.acf.favorites_articles[1].article.ID}&_embed=1`
    );
    typeof fav2[0] !== `undefined` ? (fav2 = fav2[0]) : (fav2 = fav2);

    let fav3 = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${
        page.acf.favorites_articles[2].article.post_type === "post"
          ? `posts`
          : page.acf.favorites_articles[2].article.post_type
      }?include=${page.acf.favorites_articles[2].article.ID}&_embed=1`
    );
    typeof fav3[0] !== `undefined` ? (fav3 = fav3[0]) : (fav3 = fav3);

    let favs = [];
    favs.push(fav1);
    favs.push(fav2);
    favs.push(fav3);

    return { page, hightligh, fav1, fav2, fav3, favs, finalArr };
  },
  methods: {
    handler(component) {
      this.num += 1;

      if (this.num > this._length) {
        this.isLoaded = true;
      }
    },
    getLength() {
      return axios
        .get(
          `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=press&type[]=projects&type[]=post&per_page=100`
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
          `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=press&type[]=projects&type[]=post&_embed=1&per_page=${this.loaded}`
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
.t-wrap {
  /* padding: 0 20%; */
  margin: 62px auto 74px;

  @media (max-width: $tabletDown) {
    padding: 0 10%;
    margin: 24px auto 36px;
  }
}

.cta {
  margin-top: 90px;
  margin-bottom: 90px;

  @media (max-width: $tabletDown) {
    margin-top: 40px;
    margin-bottom: 40px;
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
  /* max-width: 1280px; */

  > div {
    width: calc(calc(100% / 3) - 16px);
    /* padding: 0 12.5px; */

    img {
      width: 100%;
      height: auto;

      transition: all 0.5s;
      transform-origin: bottom center;
    }

    &:nth-child(2) {
      margin-right: 24px;
      margin-left: 24px;
    }

    &:hover {
      img {
        transform: translateY(-8px);
      }
    }
  }

  @media (max-width: $tablet) {
    padding: 0 4.5%;
  }

  @media (max-width: $tabletDown) {
    > div {
      width: 100%;
      margin-top: 44px;

      &:nth-child(2) {
        margin-right: 0;
        margin-left: 0;
      }
    }
  }
}

.wall {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 7.8%;
  margin: 48px auto;
  text-align: center;

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

    h3 {
      font-size: 10px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 1.2px;
      color: #383839;
      margin-top: 24px;
      @media (min-width: $tablet) {
        max-width: 80%;
      }
      text-transform: uppercase;
    }

    h2 {
      font-size: 24px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.8px;
      color: #000000;
      margin: 15px 0 18px;
      @media (min-width: $tablet) {
        max-width: 80%;
      }
    }

    div {
      p {
        font-size: 14px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.71;
        letter-spacing: normal;
        color: #787878;
        @media (min-width: $tablet) {
          max-width: 80%;
        }
      }
    }

    .arrow {
      display: inline-block;
      margin-top: 24px;
      transition: all 0.5s;
      transform-origin: left center;
    }

    &:hover {
      img {
        transform: translateY(-8px);
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
    > div {
      width: 100%;
      margin-top: 48px;
      margin-right: 0 !important;
      margin-left: 0 !important;
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

