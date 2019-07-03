<template>
  <div class="artikel">
    <div class="artikel-head" v-if="post.acf.hero_title">
      <p>{{post.type}}: {{post.acf.hero_title}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
    </div>
    <div class="artikel-head" v-else>
      <p>{{post.type}}: {{post.title.rendered}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
    </div>
    <figure class="artikel-hero">
      <img v-if="post.acf.hero" :src="url+post.acf.hero.url" :title="post.acf.hero.title" />
      <figcaption v-if="post.acf.hero.caption">{{post.acf.hero.caption}}</figcaption>
    </figure>

    <Modules :data="post.acf" />

    <p class="cta">
      <nuxt-link :to="`/${post.type}`">View all {{post.type}}</nuxt-link>
    </p>
  </div>
</template>

<script>
import Modules from "~/components/Modules/index";

export default {
  props: ["data"],
  components: {
    Modules
  },
  data() {
    // console.log(this.data);
    return {
      post: this.data,
      url: ""
    };
  },
  mounted() {
    this.url = process.env.API;
  },
  head() {
    return {
      title: `${
        this.post.title ? this.post.title.rendered : ``
      } - Press - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: this.post.excerpt ? this.post.excerpt.rendered : ``
        }
      ]
    };
  }
};
</script>

<style lang="scss" >
.artikel {
  padding: 0 5%;
  margin-top: 130px;

  &-head {
    p {
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  h1 {
    margin-bottom: 10px;
  }

  figure {
    display: flex;
    flex-direction: column;
    width: fit-content;
    justify-content: center;
    justify-items: center;
    align-content: center;
    margin: 40px auto;
    width: 43%;
  }

  &-hero {
    width: 100% !important;
  }
}
</style>
