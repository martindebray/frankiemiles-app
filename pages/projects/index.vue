<template>
  <div class="wrap" id="sorting">
    <div class="text">
      <!-- <h2 class="h2">{{page.title.rendered}}</h2> -->
      <h2 class="h2">Projects</h2>

      <div>
        <ul :class="sortType">
          <li class="alpha" @click="sort('alpha')">Alphabetical</li>
          <li class="chrono" @click="sort('chrono')">Chronological</li>
        </ul>
      </div>
    </div>

    <Projects :sort="sortType" :key="key" />
  </div>
</template>

<script>
import Projects from "~/components/Projects";

export default {
  components: {
    Projects
  },
  data() {
    return {
      sortType: "chrono",
      key: 0,
      page: []
    };
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=projects`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);
    return {
      page
    };
  },
  methods: {
    sort(type) {
      this.sortType = type;
      this.key = this.key + 1;
    }
  },
  mounted() {
    this.sortType = "alpha";
  },
  head() {
    return {
      // title: `${this.page.title.rendered} - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description"
          // content: this.page.excerpt.rendered
        }
      ]
    };
  }
};
</script>

