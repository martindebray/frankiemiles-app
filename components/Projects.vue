<template>
  <Grid id="projects" :classes="`grid grid4 gridStart`" :data="projects" />
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
  props: ["sort"],
  components: {
    Grid
  },
  data() {
    return {
      projects: []
    };
  },
  methods: {
    getProjects() {
      let data = null;

      if (this.sort === `alpha`) {
        return axios
          .get(
            `${process.env.API}/wp-json/wp/v2/projects?orderby=title&order=asc`
          )
          .then(res => {
            this.projects = res.data;
          });
      } else if (this.sort === `chrono`) {
        return axios
          .get(
            `${process.env.API}/wp-json/wp/v2/projects?orderby=date&order=desc`
          )
          .then(res => {
            this.projects = res.data;
          });
      }
    }
  },
  mounted() {
    this.getProjects();
  }
};
</script>
