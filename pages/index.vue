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
          <h4 v-if="item.type === `project`">Comissioned Projects</h4>
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
              <div v-if="i.excerpt" v-html="i.excerpt.rendered" />
            </lazy-component>
          </nuxt-link>
          <nuxt-link v-else :to="`/${i.type}/${i.slug}`">
            <lazy-component @show="handler">
              <img :src="i.acf.hero.url" v-rjs="2" />
              <h3 v-if="i.type === `project`">Comissioned Projects</h3>
              <h3 v-else>Press</h3>
              <h2>{{i.title.rendered}}</h2>
              <div v-if="i.excerpt" v-html="i.excerpt.rendered" />
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
      isLoaded: false
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
  margin: 62px auto 74px;
}

.cta {
  margin-top: 90px;
  margin-bottom: 90px;
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
    width: calc(100% / 3);
    padding: 0 12.5px;

    img {
      height: auto;
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
    width: calc(100% / 2);
    padding: 0 24px;
    margin-top: 48px;
    text-align: left;

    img {
      width: 100%;
      height: auto;
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
      max-width: 80%;
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
      max-width: 80%;
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
        max-width: 80%;
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
}
</style>

