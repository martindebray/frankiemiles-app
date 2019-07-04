<template>
  <div :class="`artikel ${post.type === `journal` ? `journal` : `base`}`">
    <div class="artikel-head">
      <p v-if="post.type === `projects`">{{post.type}}: {{post.title.rendered}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
      <p v-if="post.type !== `projects`">{{post._embedded['wp:term'][0][0].name}}</p>
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
      width: 100%;
      display: flex;
      flex-direction: column;
      width: fit-content;
      justify-content: center;
      justify-items: center;
      align-content: center;
      margin: 40px auto;
      width: 43%;
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
    }

    .artikel-hero {
      width: 100% !important;
    }
  }

  &.base,
  &.journal {
    .artikel-markup {
      > *:not(.wide) {
        padding: 0 20%;
      }

      > *.wide {
        padding: 0 8%;
      }
    }
  }

  .cta {
    margin: 96px auto;
  }

  @media (max-width: $tabletDown) {
    &.base {
      .artikel-head {
        padding: 0 7.5%;
      }
    }
  }
}
</style>
