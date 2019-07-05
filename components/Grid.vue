<template>
  <div class="grid">
    <div
      v-for="item in data"
      :class="`grid-item grid-item--${item.type}`"
      v-animate="'r-slide-down'"
    >
      <nuxt-link v-if="item.type !== `press`" :class="item.type" :to="`/${item.type}/${item.slug}`">
        <img
          v-if="item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0]"
          :src="item._embedded['wp:featuredmedia'][0].source_url"
          :title="item._embedded['wp:featuredmedia'][0].title.rendered"
        />
        <p
          v-if="item._embedded && item._embedded['wp:term']"
          class="t-cat"
        >{{item._embedded["wp:term"][0][0].name}}</p>
        <p class="t-cat" v-else-if="item.type === `projects`">Comissioned Projects</p>
        <p class="t-cat" v-else>{{item.type}}</p>
        <h3 v-if="item.title" class="grid-item-title">{{item.title.rendered}}</h3>
      </nuxt-link>
      <a v-else :href="item.acf.link.url" target="_blank" :class="item.type">
        <img
          v-if="item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0]"
          :src="item._embedded['wp:featuredmedia'][0].source_url"
          :title="item._embedded['wp:featuredmedia'][0].title.rendered"
        />
        <p v-if="item.title" class="grid-item-title">{{item.title.rendered}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  props: ["data", "classes", "type"],
  mounted() {
    this.url = process.env.API;
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;

  &-item {
    > a {
      display: inline-block;
      transition: all 0.5s;
      opacity: 1;
    }

    img {
      width: 100%;
      height: auto;
      transition: all 0.5s;
      transform-origin: bottom center;
    }

    &:hover {
      img {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
        transform: translateY(-8px) !important;
      }
    }
  }

  &.grid2 {
    grid-template-columns: 1fr 1fr;
    grid-gap: 72px 24px;
  }

  &.grid3 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 72px 24px;
  }

  &.grid4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;

    @media (max-width: $tablet) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: $tabletDown) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &.gridStart {
    justify-content: flex-start;
  }

  @media (max-width: $tabletDown) {
    grid-template-columns: 1fr !important;
  }
}
</style>

