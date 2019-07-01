<template>
  <section class="wrap">
    <div>
      <h1 class="title">{{post.title.rendered}}</h1>
      <div v-if="post.content.rendered" v-html="post.content.rendered"></div>
    </div>
  </section>
</template>
<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  async asyncData({ params, $axios }) {
    let post = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/press?slug=${params.id}`
    );

    typeof post[0] !== `undefined` ? (post = post[0]) : (post = post);
    return { post };
  },
  head() {
    return {
      title: `${this.post.title.rendered} - Press - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: this.post.excerpt ? this.post.excerpt.rendered : ""
        }
      ]
    };
  }
};
</script>
