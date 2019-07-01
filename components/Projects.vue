<template>
  <Grid id="projects" :classes="`grid grid4 gridStart`" :data="projects"/>
</template>

<script>
import axios from "axios";
import Grid from "~/components/Grid";

export default {
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

      return axios
        .get(`${process.env.API}/wp-json/wp/v2/projects`)
        .then(res => {
          this.projects = res.data;
        });
    }
  },
  mounted() {
    this.getProjects();
  }
};
</script>
