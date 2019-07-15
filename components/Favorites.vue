<template>
  <div class="favorites" v-if="key > 0">
    <Grid class="grid3 grid-sm" :data="data" typee="foo" />
  </div>
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
  props: ["favs", "query"],
  components: {
    Grid
  },
  data() {
    return {
      data: [],
      key: 0
    };
  },
  async created() {
    let fav1 = await axios.get(
      `${process.env.API}/wp-json/wp/v2/${this.favs.article_1.post_type}?include=${this.favs.article_1.ID}&_embed=1`
    );

    let fav2 = await axios.get(
      `${process.env.API}/wp-json/wp/v2/${this.favs.article_2.post_type}?include=${this.favs.article_2.ID}&_embed=1`
    );

    let fav3 = await axios.get(
      `${process.env.API}/wp-json/wp/v2/${this.favs.article_3.post_type}?include=${this.favs.article_3.ID}&_embed=1`
    );

    let favs = [];
    favs.push(fav1.data[0]);
    favs.push(fav2.data[0]);
    favs.push(fav3.data[0]);

    this.data = favs;
    this.key = this.key + 1;
  }
};
</script>

