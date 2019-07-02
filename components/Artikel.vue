<template>
  <div class="artikel">
    <div class="artikel-head" v-if="post.acf.hero_title">
      <p>{{post.type}}: {{post.acf.hero_title}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
    </div>
    <div class="artikel-head" v-else>
      <p>{{post.type}}: {{post.title.rendered}}</p>
      <h1 class="h1">{{post.title.rendered}}</h1>
    </div>

    <img v-if="post.acf.hero" :src="post.acf.hero.url" :title="post.acf.hero.title" />

    <Modules :data="post.acf" />
  </div>
</template>

<script>
import Modules from "~/components/Modules/index";

export default {
  props: ["data"],
  components: {
    Modules
  },
  data() {
    // console.log(this.data);
    return {
      post: this.data
    };
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

<style lang="scss" scoped>
.artikel {
  padding: 0 5%;
  margin-top: 130px;

  &-head {
    p {
      text-transform: capitalize;
    }
  }

  h1 {
    margin-bottom: 10px;
  }

  img {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
