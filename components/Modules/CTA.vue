<template>
  <div class="cta">
    <nuxt-link :to="cta.link">{{cta.label}}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      cta: this.data
    };
  }
};
</script>

<style lang="scss" scoped>
.cta {
  margin: 0 auto;
  text-align: center;

  a {
    display: inline-block;
    padding: 16px 0;
    width: 100%;
    max-width: 110px;
    background: $royalblue;
    border-radius: 25px;
    text-align: center;
    text-transform: uppercase;
    color: $purewhite;
    overflow: hidden;

    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: hsl(236, 32%, 26%);

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #2642b7;
      transform-origin: center bottom;
      transform: scaleY(0);
      transition: transform 0.25s ease-in-out;
    }
  }

  &:hover {
    a {
      &::before {
        transform-origin: center top;
        transform: scaleY(1);
      }
    }
  }
}
</style>

