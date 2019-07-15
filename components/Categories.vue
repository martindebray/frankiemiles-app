<template>
  <section class>
    <div v-for="(category, k) in categories" :key="k">
      <div v-if="category.name !== `Uncategorized`">
        <h2>{{category.name}}</h2>
        <!-- <div v-html="category.content.rendered"></div> -->
        <nuxt-link :to="`/category/${category.slug}`">See all {{category.name}} posts</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: []
    };
  },
  methods: {
    getCategories() {
      let data = null;

      return axios
        .get(`${process.env.API}/wp-json/wp/v2/categories`)
        .then(res => {
          this.categories = res.data;
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
