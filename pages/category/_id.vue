<template>
  <div class="wrap">
    <div class="text">
      <h2 class="j-tit">{{cat[0].name}}</h2>
      <div class="j-txt" v-html="cat[0].description"></div>
    </div>
    <Grid class="grid3" :data="bigArray" />
  </div>
</template>

<script>
import Grid from "~/components/Grid";

export default {
  components: {
    Grid
  },
  async asyncData({ params, $axios }) {
    let bigArray = [];

    let cat = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/categories?slug=${params.id}`
    );

    const catId = cat[0].id;

    let posts = await $axios
      .$get(
        `${process.env.API}/wp-json/wp/v2/multiple-post-type?type[]=projects&type[]=post&_embed=1&per_page=100&categories=${catId}`
      )
      .then(res => {
        res.map((k, i) => {
          bigArray.push(k);
        });
      });

    return { cat, bigArray };
  },
  head() {
    return {
      title: `${this.cat[0].name} - Category - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: `All our ${this.cat[0].name} posts`
        }
      ]
    };
  }
};
</script>
