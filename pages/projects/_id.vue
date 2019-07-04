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
      `${process.env.API}/wp-json/wp/v2/projects?slug=${params.id}&_embed=1`
    );

    typeof post[0] !== `undefined` ? (post = post[0]) : (post = post);
    return { post };
  }
};
</script>
