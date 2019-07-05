<template>
  <div class="hero" v-if="type === `home`">
    <nuxt-link :to="`/${data.type}/${data.slug}`">
      <img
        v-if="data._embedded['wp:featuredmedia']"
        :src="data._embedded['wp:featuredmedia'][0].source_url"
      />
      <div class="metas">
        <h1 class="h1">{{data.title.rendered}}</h1>
        <p v-if="data.type === `projects`" class="t-cat">Comissioned Project</p>
        <p
          v-else-if="data._embedded['wp:term']"
          class="t-cat"
        >{{data._embedded["wp:term"][0][0].name}}</p>
      </div>
    </nuxt-link>
  </div>
  <div class="hero" v-else-if="type === `normal`">
    <img
      v-if="data._embedded['wp:featuredmedia']"
      :src="data._embedded['wp:featuredmedia'][0].source_url"
      :title="data._embedded['wp:featuredmedia'][0].title.rendered"
    />
    <div class="metas center">
      <h1 class="h1">{{data.title.rendered}}</h1>
      <p v-if="data.type !== `page`" class="t-cat">{{data.type.toUpperCase()}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "type"]
};
</script>


<style lang="scss">
.hero {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  a {
    display: block;
    height: 100%;

    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.15);
      transition: 0.2s ease;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: 30s ease-in;
  }

  .metas {
    position: absolute;
    z-index: 1;
    bottom: 7.4%;
    left: 5.6%;
    max-width: 65%;
    color: $purewhite;

    &.center {
      margin: 0 auto;
      right: 5.6%;
      text-align: center;
    }

    .t-cat {
      margin-top: 20px;
      color: $purewhite;
    }
  }

  &:hover {
    img {
      transform: scale(1.2);
    }
  }

  @media (max-width: $tabletDown) {
    height: 90vh;

    .metas {
      h1 {
        line-height: 1.36;
      }

      p {
        margin-top: 10px;

        font-size: 10px;
      }
    }
  }
}
</style>
