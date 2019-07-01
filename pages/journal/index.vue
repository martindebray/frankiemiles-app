<template>
  <div class="wrap">
    <div class="text">
      <h2 class="h2">{{page.title.rendered}}</h2>
      <div v-html="page.content.rendered"></div>
    </div>
    <Posts/>
  </div>
</template>

<script>
import Posts from "~/components/Posts";

export default {
  components: {
    Posts
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=journal`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);
    return { page };
  },
  head() {
    return {
      title: `${this.page.title.rendered} - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: this.page.excerpt.rendered
        }
      ]
    };
  }
};
</script>
