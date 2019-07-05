<template>
  <div :class="`artikel ${post.type === `journal` ? `journal` : `base`}`">
    <div class="artikel-head">
      <p class="t-cat" v-if="post.type === `projects`">{{post.type}}: {{post.title.rendered}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
      <p class="t-cat" v-if="post.type !== `projects`">{{post._embedded['wp:term'][0][0].name}}</p>
    </div>
    <figure class="artikel-hero">
      <img
        v-if="post._embedded['wp:featuredmedia']"
        :src="post._embedded['wp:featuredmedia'][0].source_url"
        :title="post._embedded['wp:featuredmedia'][0].title.rendered"
      />
      <figcaption
        v-if="post._embedded['wp:featuredmedia']"
      >{{post._embedded['wp:featuredmedia'][0].caption.rendered}}</figcaption>
    </figure>

    <div v-html="post.content.rendered" class="artikel-markup" />

    <p class="cta" v-if="post.type === `projects`">
      <nuxt-link :to="`/${post.type}`">View all {{post.type}}</nuxt-link>
    </p>
    <UMayLike v-else :data="post.categories[0]" />
  </div>
</template>

<script>
import UMayLike from "~/components/UMayLike";

export default {
  components: {
    UMayLike
  },
  props: ["data"],
  data() {
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

<style lang="scss">
.artikel {
  margin-top: 150px;

  &.journal {
    .artikel-head {
      padding: 0 7.5%;
      text-align: center;
    }

    .artikel-hero {
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
    margin: 34px auto 56px;
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
        padding: 0 7.5%;
      }
    }
  }
}
</style>
