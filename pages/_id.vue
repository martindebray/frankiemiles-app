<template>
  <div>
    <Hero v-if="page.acf.hero" :data="page.acf.hero" type="normal" />
    <div v-if="page" class="wrap">
      <Categories v-if="page.template === `all-categories.php`" />
      <Posts v-else-if="page.template === `all-posts.php`" />
      <Press v-else-if="page.template === `all-press.php`" />
      <Projects v-else-if="page.template === `all-projects.php`" />
      <Modules :data="page.acf" />
    </div>
    <div v-else>FAIL</div>
  </div>
</template>

<script>
import Categories from "~/components/Categories";
import Hero from "~/components/Hero";
import Posts from "~/components/Posts";
import Press from "~/components/Press";
import Projects from "~/components/Projects";
import Modules from "~/components/Modules/index";

export default {
  components: {
    Categories,
    Hero,
    Posts,
    Press,
    Projects,
    Modules
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=${params.id}`
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
