<template>
  <div class="wrap">
    <div class="text">
      <h1 class="h2">{{page.title.rendered}}</h1>
      <div class="t-big-serif" v-html="page.content.rendered"></div>
    </div>
    <Journal />
  </div>
</template>

<script>
import Journal from "~/components/Journal";

export default {
  components: {
    Journal
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

<style lang="scss" scoped>
.wrap {
  margin-top: 210px;
}
</style>
