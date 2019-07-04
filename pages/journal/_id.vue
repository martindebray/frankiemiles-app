<template>
  <div class="artikel artikel-j">
    <div class="artikel-head">
      <h1 class="h1">{{post.title.rendered}}</h1>
      <p class="t-cat">{{post._embedded["wp:term"][0][0].name}}</p>
    </div>
    <figure>
      <img v-if="post.acf.hero" :src="post.acf.hero.url" :title="post.acf.hero.title" />
      <figcaption v-if="post.acf.hero.caption">{{post.acf.hero.caption}}</figcaption>
    </figure>
    <!-- <div v-if="post.content.rendered.length > 0" v-html="post.content.rendered"></div> -->
    <Modules :data="post.acf" />

    <br />
    <UMayLike v-if="post._embedded['wp:term'][0][0].id" :data="post._embedded['wp:term'][0][0].id" />
  </div>
</template>

<script>
import Modules from "~/components/Modules/index";
import UMayLike from "~/components/UMayLike";

export default {
  components: {
    Modules,
    UMayLike
  },
  data() {
    return {
      url: ""
    };
  },
  async asyncData({ params, $axios }) {
    let post = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/posts?slug=${params.id}&_embed=1`
    );

    typeof post[0] !== `undefined` ? (post = post[0]) : (post = post);

    return { post };
  },
  mounted() {
    this.url = process.env.API;
  },
  head() {
    return {
      title: `${this.post.title.rendered} - Journal - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: this.post.excerpt.rendered
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.artikel-j {
  padding: 0 5%;
  margin-top: 150px;

  h1 {
    padding: 0 9.1%;
  }

  figure {
    display: flex;
    flex-direction: column;
    width: fit-content;
    justify-content: center;
    justify-items: center;
    align-content: center;
    margin: 40px auto;
  }
}
</style>
