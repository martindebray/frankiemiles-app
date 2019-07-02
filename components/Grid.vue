<template>
  <div :class="classes">
    <div v-for="item in data" class="g-item" v-animate="'r-slide-down'">
      <nuxt-link
        v-if="item.type === `post`"
        :to="`/journal/${item.slug}`"
        :class="` ${isLoaded ? 'loaded' : ''}`"
      >
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h4
          v-if="item._embedded && item._embedded['wp:term']"
        >{{item._embedded["wp:term"][0][0].name}}</h4>
        <h3 v-if="item.title">{{item.title.rendered}}</h3>
      </nuxt-link>
      <nuxt-link
        v-else-if="item.type === `projects`"
        :to="`/projects/${item.slug}`"
        :class="` ${isLoaded ? 'loaded' : ''}`"
      >
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h4>Comissioned Projects</h4>
        <h3 v-if="item.title">{{item.title.rendered}}</h3>
      </nuxt-link>
      <nuxt-link
        v-else-if="item.type === `press`"
        :to="`/press/${item.slug}`"
        :class="` ${isLoaded ? 'loaded' : ''}`"
      >
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h4 v-if="item._embedded && item._embedded['wp:term']">{{item.type}}</h4>
        <h3 v-if="item.title">{{item.title.rendered}}</h3>
      </nuxt-link>
      <nuxt-link v-else-if="item.type === `page`" :to="item.slug">
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h4
          v-if="item._embedded && item._embedded['wp:term']"
        >{{item._embedded["wp:term"][0][0].name}}</h4>
        <h3 v-if="item.title">{{item.title.rendered}}</h3>
      </nuxt-link>
      <nuxt-link v-else :to="`/${item.type}/${item.slug}`" :class="item.type">
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h4
          v-if="item._embedded && item._embedded['wp:term']"
        >{{item._embedded["wp:term"][0][0].name}}</h4>
        <h3 v-if="item.title">{{item.title.rendered}}</h3>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      isLoaded: false
    };
  },
  props: ["data", "classes", "type"],
  methods: {
    handler(component) {
      this.num += 1;

      if (this.num > this.data.length) {
        this.isLoaded = true;
      }
    }
  },
  mounted() {
    // console.log("this", this);
  }
};
</script>

<style lang="scss">
.grid {
  display: grid;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;

  .g-item {
    /* padding: 24px 0; */

    img {
      width: 100%;
      height: auto;
      transition: all 0.5s;
      transform-origin: bottom center;
    }

    &:hover {
      img {
        transform: translateY(-8px) !important;
      }
    }
  }

  &.grid3 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 72px 24px;

    .g-item {
      /* width: calc(100% / 3); */
      /* margin-bottom: 72px; */
    }
  }

  &.grid4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }

  &.gridStart {
    justify-content: flex-start;
  }

  @media (max-width: $tabletDown) {
    grid-template-columns: 1fr !important;
  }
}
</style>

