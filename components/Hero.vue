<template>
  <div class="hero" v-if="type === `home`">
    <nuxt-link v-if="data.type === `post`" :to="`/journal/${data.slug}`">
      <img v-if="data.acf.hero" :src="data.acf.hero.url" :title="data.acf.hero.title" v-rjs="1" />
      <div class="metas">
        <h1 class="h1">{{data.title.rendered}}</h1>
        <p v-if="data.type">{{data._embedded["wp:term"][0][0].name}}</p>
      </div>
    </nuxt-link>
    <nuxt-link v-else :to="`/${data.type}/${data.slug}`">
      <img v-if="data.acf.hero" :src="data.acf.hero.url" :title="data.acf.hero.title" v-rjs="1" />
      <div class="metas">
        <h1 class="h1">{{data.title.rendered}}</h1>
        <p v-if="data.type === `projects`">Comissioned Project</p>
        <p v-else>{{data.type}}</p>
      </div>
    </nuxt-link>
  </div>
  <div class="hero" v-else-if="type === `normal`">
    <img v-if="data[0].image" :src="data[0].image.url" :title="data[0].image.title" v-rjs="1" />
    <div class="metas center">
      <h1 class="h1">{{data[0].headline}}</h1>
      <p v-if="data.type">{{data.type.toUpperCase()}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "type"],
  data() {
    return {
      url: ""
    };
  },
  mounted() {
    // console.log(this.data);
    this.url = process.env.API;
    console.log(this.data.acf.hero);
    console.log(this.url + this.data.acf.hero.url);
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

    p {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 900;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 1.2px;
      color: #ffffff;

      text-transform: uppercase;
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

        font-size: 10px;
      }
    }
  }
}
</style>
