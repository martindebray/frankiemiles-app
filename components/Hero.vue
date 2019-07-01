<template>
  <div class="hero" v-if="type === `home`">
    <nuxt-link :to="`/journal/${data.slug}`">
      <img v-if="data.acf.hero" :src="data.acf.hero.url" :title="data.acf.hero.title" />
      <div class="metas">
        <h1 class="h1">{{data.title.rendered}}</h1>
        <p v-if="data.type">JOURNAL</p>
      </div>
    </nuxt-link>
  </div>
  <div class="hero" v-else-if="type === `normal`">
    <img v-if="data[0].image" :src="data[0].image.url" :title="data[0].image.title" />
    <div class="metas center">
      <h1 class="h1">{{data[0].headline}}</h1>
      <p v-if="data.type">{{data.type.toUpperCase()}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "type"],
  mounted() {
    console.log(this.data);
  }
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
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: 60s ease-in;
  }

  .metas {
    position: absolute;
    bottom: 7.4%;
    left: 5.6%;
    max-width: 65%;
    color: $purewhite;

    &.center {
      margin: 0 auto;
      right: 5.6%;
      text-align: center;
    }

    p {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 900;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 1.2px;
      color: #ffffff;
    }
  }

  &:hover {
    img {
      transform: scale(1.2);
    }
  }

  @media (max-width: $tabletDown) {
    .metas {
      h1 {
        line-height: 1.36;
      }

      p {
        margin-top: 10px;

        font-size: 18px;
      }
    }
  }
}
</style>
