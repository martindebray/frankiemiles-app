<template>
  <div>
    <Hero v-if="page._embedded['wp:featuredmedia']" :data="page" type="normal" />

    <div v-if="page" class>
      <!-- <div v-if="page.content.rendered" v-html="page.content.rendered" class="plain markup" /> -->
      <div class="plain markup">
        <Blocks :data="page.blocks" />
      </div>
    </div>

    <div v-else>FAILURE</div>
  </div>
</template>

<script>
import Hero from "~/components/Hero";
import Blocks from "~/components/Blocks";

export default {
  components: {
    Hero,
    Blocks
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
.plain {
  margin-top: 150px;
  margin-bottom: 150px;

  &.markup {
    h3.h3,
    h3 {
      margin: 42px auto;
    }

    p,
    .p {
      margin: 12px auto 8px;
    }

    a {
      color: $pureblack;

      &:hover {
        color: #999999;
      }
    }
  }

  @media (max-width: $tablet) {
    margin-top: 80px;
    margin-bottom: 80px;
    padding: 0 7.5%;
  }

  @media (max-width: $tabletDown) {
    margin-top: 110px;
    margin-bottom: 80px;

    &.markup {
      h3,
      .h3 {
        margin: 24px auto 32px;
      }

      p,
      .p {
        margin: 12px auto;
      }
    }
  }
}

.markup {
  h3,
  .h3 {
    margin: 54px auto 84px;
  }

  p,
  .p {
    margin: 32px auto;
  }

  > div > div > div {
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
}
</style>



