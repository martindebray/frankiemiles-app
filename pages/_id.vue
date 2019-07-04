<template>
  <div>
    <Hero v-if="page._embedded['wp:featuredmedia']" :data="page" type="normal" />

    <div v-if="page" class="wrap">
      <div v-if="page.content.rendered" v-html="page.content.rendered" class="markup" />
    </div>

    <div v-else>FAILURE</div>
  </div>
</template>

<script>
import Hero from "~/components/Hero";

export default {
  components: {
    Hero
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=${params.id}&_embed=1`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);
    return { page };
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
    const theme = this.page.acf.theme;
    if (theme === "White") {
      document.getElementById("header").setAttribute("data-theme", "white");
    } else {
      document.getElementById("header").setAttribute("data-theme", "dark");
    }
  }
};
</script>
