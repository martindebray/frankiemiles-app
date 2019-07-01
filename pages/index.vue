<template>
  <div>
    <Hero v-if="post" :data="post" type="home" />
    <Modules :data="page.acf" />
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
      `${process.env.API}/wp-json/wp/v2/pages?slug=home&_embed=1`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);

    console.log(page);
    let post = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/${
        page.acf.hero.post_type === "post" ? `posts` : page.acf.hero.post_type
      }?include=${page.acf.hero.ID}&_embed=1`
    );
    typeof post[0] !== `undefined` ? (post = post[0]) : (post = post);

    return { page, post };
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
