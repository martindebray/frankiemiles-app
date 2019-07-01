<template>
  <section class="wrap">
    <div class="artikel">
      <div class="artikel-head">
        <h1 class="h1">{{post.title.rendered}}</h1>
        <p>Journal</p>
      </div>
      <img v-if="post.acf.hero" :src="post.acf.hero.url" :title="post.acf.hero.title" />
      <!-- <div v-if="post.content.rendered.length > 0" v-html="post.content.rendered"></div> -->
      <Modules :data="post.acf" />
    </div>
  </section>
</template>

<script>
import Modules from "~/components/Modules/index";

export default {
  components: {
    Modules
  },
  async asyncData({ params, $axios }) {
    let post = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/posts?slug=${params.id}`
    );

    typeof post[0] !== `undefined` ? (post = post[0]) : (post = post);

    return { post };
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

<style lang="scss" scoped>
.artikel {
  text-align: center;

  h1 {
    margin-bottom: 10px;
  }

  img {
    margin-top: 40px;
  }
}
</style>
