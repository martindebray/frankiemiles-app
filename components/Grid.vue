<template>
  <div :class="classes">
    <div v-for="item in data" class="item" v-animate="'r-slide-down'">
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
        <h3
          v-if="item._embedded && item._embedded['wp:term']"
        >{{item._embedded["wp:term"][0][0].name}}</h3>
        <h2 v-if="item.title">{{item.title.rendered}}</h2>
      </nuxt-link>
      <nuxt-link v-else-if="item.type === `page`" :to="item.slug">
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h3
          v-if="item._embedded && item._embedded['wp:term']"
        >{{item._embedded["wp:term"][0][0].name}}</h3>
        <h2 v-if="item.title">{{item.title.rendered}}</h2>
      </nuxt-link>
      <nuxt-link v-else :to="`/${item.type}/${item.slug}`">
        <lazy-component @show="handler">
          <img
            v-if="item.acf && item.acf.hero"
            :src="item.acf.hero.url"
            :title="item.acf.hero.title"
          />
        </lazy-component>
        <h3
          v-if="item._embedded && item._embedded['wp:term']"
        >{{item._embedded["wp:term"][0][0].name}}</h3>
        <h2 v-if="item.title">{{item.title.rendered}}</h2>
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

      // console.log(this.num, this.data.length);

      if (this.num > this.data.length) {
        this.isLoaded = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  > a {
    display: inline-block;
    transition: all 0.5s;
    opacity: 1;

    &.loaded {
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
.grid {
  display: grid;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;

  .item {
    /* padding: 24px 0; */

    img {
      width: 100%;
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

    .item {
      /* width: calc(100% / 3); */
      /* margin-bottom: 72px; */
    }
  }

  &.grid4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 40px;
  }

  &.gridStart {
    justify-content: flex-start;
  }

  @media (max-width: $tabletDown) {
    grid-template-columns: 1fr !important;
  }
}
</style>

