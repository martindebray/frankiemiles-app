<template>
  <div>
    <Hero v-if="page._embedded['wp:featuredmedia']" :data="page" type="normal" />

    <div v-if="page" class>
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

<style lang="scss">
.markup {
  h3,
  .h3 {
    margin: 54px auto 84px;
  }

  p,
  .p {
    margin: 32px auto;
  }

  > * {
    &:not(.wide),
    &:not(.wp-block-image) {
      padding: 0 2%;
      max-width: 610px;
    }

    &.wide,
    &.columns-5,
    &.alignwide {
      padding: 0 2%;
      max-width: 1146px;
    }

    > .wp-block-columns.has-2-columns {
      padding: 0 3.5%;
      max-width: initial;
    }
  }
}
</style>



