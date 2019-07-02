<template>
  <Artikel :data="post" />
</template>

<script>
import Artikel from "~/components/Artikel";

export default {
  components: {
    Artikel
  },
  async asyncData({ params, $axios }) {
    let post = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/press?slug=${params.id}`
    );

    typeof post[0] !== `undefined` ? (post = post[0]) : (post = post);
    return { post };
  }
};
</script>
