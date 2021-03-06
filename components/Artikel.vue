<template>
  <div :class="`artikel ${post.type === `journal` ? `journal` : `base`}`">
    <div class="artikel-head" data-aos="fade-up">
      <p class="t-cat" v-if="post.type === `projects`">{{post.type}}: {{post.title.rendered}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
      <p class="t-cat" v-if="post.type !== `projects`">{{post._embedded['wp:term'][0][0].name}}</p>
    </div>
    <figure class="artikel-hero" data-aos="fade-up">
      <img
        v-if="post._embedded['wp:featuredmedia']"
        v-lazy="post._embedded['wp:featuredmedia'][0].source_url"
        :title="post._embedded['wp:featuredmedia'][0].title.rendered"
      />
      <figcaption
        v-if="post._embedded['wp:featuredmedia'][0].caption.rendered"
      >{{post._embedded['wp:featuredmedia'][0].caption.rendered}}</figcaption>
    </figure>
    <div :class="`artikel-markup ${this.data.acf.theme === `Black` ? `artikel-dark` : ``}`">
      <Blocks :data="post.blocks" />
    </div>

    <p class="cta" v-if="post.type === `projects`">
      <nuxt-link :to="`/${post.type}`">View all {{post.type}}</nuxt-link>
    </p>
    <UMayLike v-else :data="post.categories[0]" data-aos="fade-up" />
  </div>
</template>

<script>
import AOS from "aos";
import axios from "axios";

import UMayLike from "~/components/UMayLike";
import Blocks from "~/components/Blocks";

export default {
  components: {
    UMayLike,
    Blocks
  },
  props: ["data", "img"],
  data() {
    return {
      post: this.data,
      url: ""
    };
  },
  mounted() {
    this.url = process.env.API;
    setTimeout(() => {
      AOS.refresh();
    }, 1500);
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

<style lang="scss">
.artikel {
  margin-top: 180px;

  &.journal {
    .artikel-head {
      padding: 0 7.5%;
      text-align: center;
    }

    .artikel-markup {
      padding: 0 5%;
    }
  }

  &.base {
    padding: 0 5%;
    margin-top: 130px;

    .artikel-head {
      p {
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }

    h1 {
      margin-bottom: 10px;
      margin-left: 0;
    }

    .artikel-hero {
      width: 100% !important;
    }
  }

  &.base,
  &.journal {
    .artikel-markup {
      > div > div > div {
        > *:not(.wide) {
          &:not(.wp-block-image) {
            padding: 0 2%;
            max-width: 610px;
          }
        }

        > *.wide {
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

  &-dark {
    background: $pureblack;

    * {
      color: $purewhite !important;
    }
  }

  &-head {
    h1 {
      max-width: 1100px;
      margin: 0 auto;
    }

    h2 {
      font-size: 24px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.8px;

      margin-bottom: 32px;

      &:first-letter {
        text-transform: uppercase;
      }
    }
  }

  &-hero {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 34px auto 0;

    ~ div {
      padding-top: 56px !important;
      padding-bottom: 56px !important;
    }
  }

  h3,
  .h3 {
    margin: 54px auto 84px;
  }

  p,
  .p {
    margin: 32px auto;
  }

  @media (max-width: $tablet) {
    &-hero {
      img {
        width: 100%;
      }
    }
  }

  @media (max-width: $tabletDown) {
    margin-top: 115px;

    &.base {
      .artikel-head {
        padding: 0;
      }
    }

    &.base,
    &.journal {
      .artikel-markup {
        > *:not(.wide) {
          &:not(.wp-block-image) {
            padding: 0 7.5%;
          }
        }

        > *.wide {
          padding: 0 7.5%;
        }

        > .wp-block-columns.has-2-columns {
          padding: 0 3.5%;
        }
      }
    }

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
</style>
